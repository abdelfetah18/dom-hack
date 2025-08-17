import APIHook from "./APIHook";

export default class InnerHTMLHook extends APIHook {
    static OriginalInnerHTMLDescriptor: PropertyDescriptor;

    inject(): void {
        const contentIPC = this.contentIPC;

        InnerHTMLHook.OriginalInnerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');

        Object.defineProperty(Element.prototype, 'innerHTML', {
            get: function () {
                const value = InnerHTMLHook.OriginalInnerHTMLDescriptor.get.call(this);
                contentIPC.send("dom-hack_innerHTML", { value, operation: "get" });
                return value;
            },
            set: function (newValue) {
                contentIPC.send("dom-hack_innerHTML", { value: newValue.toString(), operation: "set" });
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