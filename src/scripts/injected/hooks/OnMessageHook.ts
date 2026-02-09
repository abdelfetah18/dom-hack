import APIHook from "./APIHook";

export default class OnMessageHook extends APIHook {
    API_NAME: string = "window.onmessage";

    static OriginalAddEventListener: any;

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;
        const apiHook = this;

        let currentOnMessage = null;
        OnMessageHook.OriginalAddEventListener = window.addEventListener;

        Object.defineProperty(window, 'onmessage', {
            set: function (handler) {
                currentOnMessage = handler;
                if (handler) {
                    const wrappedHandler = function (event) {
                        injectedScriptEndpoint.send(
                            "dom-hack_data-flow-event",
                            apiHook.createDataFlowEvent(
                                JSON.stringify(event.data),
                                "Source",
                            ),
                        );
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
