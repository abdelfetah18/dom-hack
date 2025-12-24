import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useBlobAPI(isSelected: boolean) {
    const [blobEvents, setBlobEvents] = useState<BlobEvent_[]>([]);

    function callback(value) {
        setBlobEvents(state => [{
            type: value.type,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_Blob", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_Blob", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_Blob", callback);
        };
    }, [isSelected]);

    return { blobEvents, setBlobEvents };
}