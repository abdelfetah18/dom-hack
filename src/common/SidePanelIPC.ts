export class SidePanelIPC {
    // store pairs of original callback + wrapper that was actually registered with Chrome
    private listeners = new Map<
        EventName,
        Array<{
            callback: Function; // original user callback (typed in public API)
            wrapper: (message: any, sender?: chrome.runtime.MessageSender, sendResponse?: (r?: any) => void) => void; // actual chrome listener
        }>
    >();

    on<E extends EventName>(eventName: E, callback: (data: DataOf<E>) => void): void {
        if (process.env.NODE_ENV === "development") return;

        const wrapper = (message: any /*, sender, sendResponse */) => {
            if (message?.eventName === eventName) {
                callback(message.data as DataOf<E>);
            }
        };

        const list = this.listeners.get(eventName) ?? [];
        list.push({ callback, wrapper });
        this.listeners.set(eventName, list);

        chrome.runtime.onMessage.addListener(wrapper);
    }

    send<E extends EventName>(eventName: E, data: DataOf<E>): void {
        if (process.env.NODE_ENV === "development") return;

        try {
            chrome.runtime.sendMessage({ eventName, data });
        } catch {
            console.log("sidePanel is not open");
        }
    }

    remove<E extends EventName>(eventName: E, callback: (data: DataOf<E>) => void): void {
        if (process.env.NODE_ENV === "development") return;

        const list = this.listeners.get(eventName);
        if (!list || list.length === 0) return;

        const idx = list.findIndex(entry => entry.callback === callback);
        if (idx === -1) return;

        const [entry] = list.splice(idx, 1);
        chrome.runtime.onMessage.removeListener(entry.wrapper);

        if (list.length === 0) {
            this.listeners.delete(eventName);
        } else {
            this.listeners.set(eventName, list);
        }
    }
}
