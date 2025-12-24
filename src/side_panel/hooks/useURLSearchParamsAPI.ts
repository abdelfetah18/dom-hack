import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useURLSearchParamsAPI(isSelected: boolean) {
    const [urlSearchParamsEvents, setURLSearchParamsEvents] = useState<URLSearchParamsEvent[]>([]);

    function callback(value) {
        setURLSearchParamsEvents(state => [{
            key: value.key,
            value: value.value,
            operation: value.operation,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_URLSearchParams", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_URLSearchParams", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_URLSearchParams", callback);
        };
    }, [isSelected]);

    return { urlSearchParamsEvents, setURLSearchParamsEvents };
}