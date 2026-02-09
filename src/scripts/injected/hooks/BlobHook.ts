import APIHook from "./APIHook";

export default class BlobHook extends APIHook {
    API_NAME: string = "Blob";

    static OriginalBlob: { new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob; prototype: Blob; };
    static CustomBlob: { new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob; prototype: Blob; };

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;
        const apiHook = this;

        BlobHook.CustomBlob = class CustomBlob extends Blob {
            constructor(blobParts?: BlobPart[], options?: BlobPropertyBag) {
                super(blobParts, options);
                injectedScriptEndpoint.send(
                    "dom-hack_data-flow-event",
                    apiHook.createDataFlowEvent(
                        options?.type || "no type provided",
                        "Transform",
                    ),
                );
            }
        }

        BlobHook.OriginalBlob = window.Blob;
        window.Blob = BlobHook.CustomBlob;
    }

    reset(): void {
        window.Blob = BlobHook.OriginalBlob;
    }
}