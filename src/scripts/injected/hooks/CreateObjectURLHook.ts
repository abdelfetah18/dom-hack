import APIHook from "./APIHook";
import BlobHook from "./BlobHook";

export default class CreateObjectURLHook extends APIHook {
    private OriginalCreateObjectURL: (obj: Blob | MediaSource) => string;

    inject(): void {
        const contentIPC = this.contentIPC;

        this.OriginalCreateObjectURL = window.URL.createObjectURL;

        window.URL.createObjectURL = (obj: Blob | MediaSource): string => {
            const url = this.OriginalCreateObjectURL(obj);
            let type = "";
            if (obj instanceof Blob || obj instanceof BlobHook.CustomBlob) {
                type = obj.type;
            } else {
                type = "media_source";
            }

            contentIPC.send("dom-hack_URL.createObjectURL", { url, type });
            return url;
        }
    }

    reset(): void {
        window.URL.createObjectURL = this.OriginalCreateObjectURL;
    }
}