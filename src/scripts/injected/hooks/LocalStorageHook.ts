import APIHook from "./APIHook";

export default class LocalStorageHook extends APIHook {
    static OriginalLocalStorageGetItem: (key: string) => string | null;
    static OriginalLocalStorageSetItem: (key: string, value: string) => void;

    inject(): void {
        const contentIPC = this.contentIPC;

        LocalStorageHook.OriginalLocalStorageGetItem = window.localStorage.getItem.bind(window.localStorage);
        LocalStorageHook.OriginalLocalStorageSetItem = window.localStorage.setItem.bind(window.localStorage);

        window.localStorage.getItem = function (key: string): string | null {
            const value = LocalStorageHook.OriginalLocalStorageGetItem(key);
            contentIPC.send("dom-hack_localStorage", { key, value, operation: "getItem" });
            return value;
        }

        window.localStorage.setItem = function (key: string, value: string): void {
            LocalStorageHook.OriginalLocalStorageSetItem(key, value);
            contentIPC.send("dom-hack_localStorage", { key, value, operation: "setItem" });
        }
    }

    reset(): void {
        window.localStorage.getItem = LocalStorageHook.OriginalLocalStorageGetItem;
        window.localStorage.setItem = LocalStorageHook.OriginalLocalStorageSetItem;
    }
}