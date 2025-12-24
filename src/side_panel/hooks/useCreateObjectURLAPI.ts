import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useCreateObjectURLAPI(isSelected: boolean) {
    const [createObjectURLEvents, setCreateObjectURLEvents] = useState<CreateObjectURLEvent[]>([]);

    function callback(value) {
        setCreateObjectURLEvents(state => [{
            type: value.type,
            url: value.url,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_URL.createObjectURL", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_URL.createObjectURL", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_URL.createObjectURL", callback);
        };
    }, [isSelected]);

    return { createObjectURLEvents, setCreateObjectURLEvents };
}