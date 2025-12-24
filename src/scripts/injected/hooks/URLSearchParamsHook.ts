import APIHook from "./APIHook";

export default class URLSearchParamsHook extends APIHook {
    static OriginalGetDescriptor: PropertyDescriptor;
    static OriginalSetDescriptor: PropertyDescriptor;

    inject(): void {
        const contentIPC = this.contentIPC;

        // Save original descriptors
        URLSearchParamsHook.OriginalGetDescriptor = Object.getOwnPropertyDescriptor(URLSearchParams.prototype, 'get')!;
        URLSearchParamsHook.OriginalSetDescriptor = Object.getOwnPropertyDescriptor(URLSearchParams.prototype, 'set')!;

        // Override 'get'
        URLSearchParams.prototype.get = function (key: string) {
            const value = URLSearchParamsHook.OriginalGetDescriptor.value.call(this, key);
            contentIPC.send("dom-hack_URLSearchParams", { key, value, operation: "get" });
            return value;
        };

        // Override 'set'
        URLSearchParams.prototype.set = function (key: string, value: string) {
            URLSearchParamsHook.OriginalSetDescriptor.value.call(this, key, value);
            contentIPC.send("dom-hack_URLSearchParams", { key, value, operation: "set" });
            return this;
        };
    }

    reset(): void {
        URLSearchParams.prototype.get = URLSearchParamsHook.OriginalGetDescriptor.value;
        URLSearchParams.prototype.set = URLSearchParamsHook.OriginalSetDescriptor.value;
    }
}
