import APIHook from "./APIHook";

export default class BlobHook extends APIHook {
    static OriginalBlob: { new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob; prototype: Blob; };
    static CustomBlob: { new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob; prototype: Blob; };

    inject(): void {
        const contentIPC = this.contentIPC;
        
        BlobHook.CustomBlob = class CustomBlob extends Blob {
            constructor(blobParts?: BlobPart[], options?: BlobPropertyBag) {
                super(blobParts, options);
                contentIPC.send("dom-hack_Blob", { type: options?.type || "no type provided" });
            }
        }

        BlobHook.OriginalBlob = window.Blob;
        window.Blob = BlobHook.CustomBlob;
    }

    reset(): void {
        window.Blob = BlobHook.OriginalBlob;
    }
}