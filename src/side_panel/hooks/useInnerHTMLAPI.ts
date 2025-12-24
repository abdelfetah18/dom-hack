import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useInnerHTMLAPI(isSelected: boolean) {
    const [innerHTMLEvents, setInnerHTMLEvents] = useState<InnerHTMLEvent[]>([]);

    function callback(value) {
        setInnerHTMLEvents(state => [{
            value: value.value,
            operation: value.operation,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_innerHTML", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_innerHTML", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_innerHTML", callback);
        };
    }, [isSelected]);

    return { innerHTMLEvents, setInnerHTMLEvents };
}