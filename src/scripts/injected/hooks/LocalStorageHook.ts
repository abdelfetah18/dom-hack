import APIHook from "./APIHook";

export default class LocalStorageHook extends APIHook {
    API_NAME: string = "LocalStorage";

    static OriginalLocalStorageGetItem: (key: string) => string | null;
    static OriginalLocalStorageSetItem: (key: string, value: string) => void;

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;
        const apiHook = this;

        LocalStorageHook.OriginalLocalStorageGetItem = window.localStorage.getItem.bind(window.localStorage);
        LocalStorageHook.OriginalLocalStorageSetItem = window.localStorage.setItem.bind(window.localStorage);

        window.localStorage.getItem = function (key: string): string | null {
            const value = LocalStorageHook.OriginalLocalStorageGetItem(key);
            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                apiHook.createDataFlowEvent(
                    value,
                    "Source",
                    { key, value, operation: "getItem" },
                ),
            );
            return value;
        }

        window.localStorage.setItem = function (key: string, value: string): void {
            LocalStorageHook.OriginalLocalStorageSetItem(key, value);
            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                apiHook.createDataFlowEvent(
                    value,
                    "Source",
                    { key, value, operation: "setItem" },
                ),
            );
        }
    }

    reset(): void {
        window.localStorage.getItem = LocalStorageHook.OriginalLocalStorageGetItem;
        window.localStorage.setItem = LocalStorageHook.OriginalLocalStorageSetItem;
    }
}