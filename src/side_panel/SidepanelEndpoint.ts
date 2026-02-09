export class SidepanelEndpoint {
    private listeners = new Map<
        EventName,
        Array<{
            callback: Function;
            wrapper: (message: any, sender?: chrome.runtime.MessageSender, sendResponse?: (r?: any) => void) => void;
        }>
    >();

    private tabsIds: Set<number> = new Set();
    private _onDelete: (tabId: number) => void;

    constructor() {
        chrome.tabs.onRemoved.addListener((tabId: number) => {
            this.tabsIds.delete(tabId);
            if (this._onDelete) {
                this._onDelete(tabId);
            }
        });
    }

    onDelete(callback: (tabId: number) => void): void {
        this._onDelete = callback;
    }

    on<E extends EventName>(eventName: E, callback: (data: DataOf<E>) => void): void {
        if (process.env.NODE_ENV === "development") return;

        const wrapper = (message: any, sender: chrome.runtime.MessageSender, sendResponse) => {
            if (message?.eventName == "connect") {
                console.log(`[*] connect with endpoint id: '${sender.tab.id}'`);
                this.tabsIds.add(sender.tab.id);
                return;
            }

            if (message?.eventName === eventName) {
                let data = message.data as DataOf<E>;
                if (eventName == "dom-hack_register-frame") {
                    (data as FrameNode).tabId = sender.tab.id;
                }
                callback(data);
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
            this.tabsIds.forEach(tabId => {
                chrome.tabs.sendMessage(tabId, { eventName, data });
            });
        } catch {
            console.log("endpoint does not exist");
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
