import APIHook from "./APIHook";
import BlobHook from "./BlobHook";

export default class CreateObjectURLHook extends APIHook {
    API_NAME: string = "URL.CreateObjectURL";

    private OriginalCreateObjectURL: (obj: Blob | MediaSource) => string;

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;

        this.OriginalCreateObjectURL = window.URL.createObjectURL;

        window.URL.createObjectURL = (obj: Blob | MediaSource): string => {
            const url = this.OriginalCreateObjectURL(obj);
            let type = "";
            if (obj instanceof Blob || obj instanceof BlobHook.CustomBlob) {
                type = obj.type;
            } else {
                type = "media_source";
            }

            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                this.createDataFlowEvent(
                    url,
                    "Transform",
                    { url, type },
                ),
            );

            return url;
        }
    }

    reset(): void {
        window.URL.createObjectURL = this.OriginalCreateObjectURL;
    }
}