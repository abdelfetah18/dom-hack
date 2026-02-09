import APIHook from "./APIHook";

export default class InnerHTMLHook extends APIHook {
    API_NAME: string = "innerHTML";

    static OriginalInnerHTMLDescriptor: PropertyDescriptor;

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;
        const apiHook = this;

        InnerHTMLHook.OriginalInnerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');

        Object.defineProperty(Element.prototype, 'innerHTML', {
            get: function () {
                const value = InnerHTMLHook.OriginalInnerHTMLDescriptor.get.call(this);
                injectedScriptEndpoint.send(
                    "dom-hack_data-flow-event",
                    apiHook.createDataFlowEvent(
                        value,
                        "Sink",
                        { value, operation: "get" },
                    ),
                );
                return value;
            },
            set: function (newValue) {
                injectedScriptEndpoint.send(
                    "dom-hack_data-flow-event",
                    apiHook.createDataFlowEvent(
                        newValue.toString(),
                        "Sink",
                        { value: newValue.toString(), operation: "set" },
                    ),
                );
                return InnerHTMLHook.OriginalInnerHTMLDescriptor.set.call(this, newValue);
            },
            configurable: true,
            enumerable: InnerHTMLHook.OriginalInnerHTMLDescriptor.enumerable
        });
    }

    reset(): void {
        Object.defineProperty(Element.prototype, 'innerHTML', InnerHTMLHook.OriginalInnerHTMLDescriptor);
    }
}