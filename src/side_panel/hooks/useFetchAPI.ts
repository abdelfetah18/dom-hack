import { useEffect, useState } from "react";
import { sideSidePanelIPC } from "../ipc";

export default function useFetchAPI(isSelected: boolean) {
    const [fetchEvents, setFetchEvents] = useState<FetchEvent[]>([]);

    function callback(value) {
        setFetchEvents(state => [{
            url: value.url,
            method: value.method,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_fetch", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_fetch", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_fetch", callback);
        };
    }, [isSelected]);

    return { fetchEvents, setFetchEvents };
}