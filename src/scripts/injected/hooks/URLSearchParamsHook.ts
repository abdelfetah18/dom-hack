import APIHook from "./APIHook";

export default class URLSearchParamsHook extends APIHook {
    API_NAME: string = "URLSearchParams";

    static OriginalGetDescriptor: PropertyDescriptor;
    static OriginalSetDescriptor: PropertyDescriptor;

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;
        const domHook = this;

        URLSearchParamsHook.OriginalGetDescriptor = Object.getOwnPropertyDescriptor(URLSearchParams.prototype, 'get')!;
        URLSearchParamsHook.OriginalSetDescriptor = Object.getOwnPropertyDescriptor(URLSearchParams.prototype, 'set')!;

        URLSearchParams.prototype.get = function (key: string) {
            const value = URLSearchParamsHook.OriginalGetDescriptor.value.call(this, key);
            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                domHook.createDataFlowEvent(
                    value,
                    "Source",
                    { key, value, operation: "get" },
                ),
            );
            return value;
        };

        URLSearchParams.prototype.set = function (key: string, value: string) {
            URLSearchParamsHook.OriginalSetDescriptor.value.call(this, key, value);
            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                domHook.createDataFlowEvent(
                    value,
                    "Source",
                    { key, value, operation: "set" },
                ),
            );
            return this;
        };
    }

    reset(): void {
        URLSearchParams.prototype.get = URLSearchParamsHook.OriginalGetDescriptor.value;
        URLSearchParams.prototype.set = URLSearchParamsHook.OriginalSetDescriptor.value;
    }
}
