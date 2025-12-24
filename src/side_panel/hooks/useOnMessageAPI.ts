import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useOnMessageAPI(isSelected: boolean) {
    const [onMessageEvents, setOnMessageEvents] = useState<OnMessageEvent[]>([]);

    function callback(value) {
        setOnMessageEvents(state => [{
            data: value.data,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_onmessage", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_onmessage", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_onmessage", callback);
        };
    }, [isSelected]);

    return { onMessageEvents, setOnMessageEvents };
}