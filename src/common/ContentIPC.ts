export class ContentIPC {
    public listeners: Record<string, (...args: any[]) => any> = {};

    constructor(private window: Window) { }

    on<T extends EventName>(eventName: T, callback: (data: DataOf<T>) => void): void {
        const listener = (event) => {
            const data = (event as CustomEvent<DataOf<T>>).detail;
            callback(data);
        };

        this.listeners[eventName] = listener;
        this.window.addEventListener(eventName, listener);
    }

    send<T extends EventName>(eventName: T, data: DataOf<T>): void {
        this.window.dispatchEvent(new CustomEvent<DataOf<T>>(eventName, { detail: data }));
    }

    remove(eventName: EventName): void {
        this.window.removeEventListener(eventName, this.listeners[eventName]);
        this.listeners[eventName] = undefined;
    }
}