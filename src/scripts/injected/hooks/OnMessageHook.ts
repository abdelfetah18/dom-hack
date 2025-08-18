import APIHook from "./APIHook";

export default class OnMessageHook extends APIHook {
    static OriginalAddEventListener: any;

    inject(): void {
        const contentIPC = this.contentIPC;

        let currentOnMessage = null;
        OnMessageHook.OriginalAddEventListener = window.addEventListener;

        Object.defineProperty(window, 'onmessage', {
            set: function (handler) {
                currentOnMessage = handler;
                if (handler) {
                    const wrappedHandler = function (event) {
                        contentIPC.send("dom-hack_onmessage", { data: JSON.stringify(event.data) });
                        return handler(event);
                    };
                    OnMessageHook.OriginalAddEventListener.call(window, 'message', wrappedHandler);
                }
            },
            get: function () {
                return currentOnMessage;
            }
        });
    }

    reset(): void { }
}
