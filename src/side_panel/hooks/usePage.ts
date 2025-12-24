import { useState } from "react";
import useLocalStorageAPI from "./useLocalStorageAPI";
import useCreateObjectURLAPI from "./useCreateObjectURLAPI";
import useBlobAPI from "./useBlobAPI";
import useFetchAPI from "./useFetchAPI";
import useInnerHTMLAPI from "./useInnerHTMLAPI";
import useOnMessageAPI from "./useOnMessageAPI";
import useURLSearchParamsAPI from "./useURLSearchParamsAPI";

export default function usePage() {
    const [selectedEvents, setSelectedEvents] = useState<Array<DOMAPI>>(["LocalStorage"]);

    const { localStorageEvents, setLocalStorageEvents } = useLocalStorageAPI(selectedEvents.includes("LocalStorage"));
    const { createObjectURLEvents, setCreateObjectURLEvents } = useCreateObjectURLAPI(selectedEvents.includes("CreateObjectURL"));
    const { blobEvents, setBlobEvents } = useBlobAPI(selectedEvents.includes("Blob"));
    const { fetchEvents, setFetchEvents } = useFetchAPI(selectedEvents.includes("fetch"));
    const { innerHTMLEvents, setInnerHTMLEvents } = useInnerHTMLAPI(selectedEvents.includes("innerHTML"));
    const { onMessageEvents, setOnMessageEvents } = useOnMessageAPI(selectedEvents.includes("onmessage"));
    const { urlSearchParamsEvents, setURLSearchParamsEvents } = useURLSearchParamsAPI(selectedEvents.includes("URLSearchParams"));

    function countEvents(name: DOMAPI): number {
        switch (name) {
            case "LocalStorage":
                return localStorageEvents.length;
            case "CreateObjectURL":
                return createObjectURLEvents.length;
            case "Blob":
                return blobEvents.length;
            case "fetch":
                return fetchEvents.length;
            case "innerHTML":
                return innerHTMLEvents.length;
            case "onmessage":
                return onMessageEvents.length;
            case "URLSearchParams":
                return urlSearchParamsEvents.length;
            default:
                return 0;
        }
    }

    function isSelectedEvent(name: DOMAPI): boolean {
        return selectedEvents.includes(name);
    }

    function toggleEvent(name: DOMAPI): void {
        setSelectedEvents(state => {
            return state.includes(name) ? state.filter(n => n != name) : [...state, name];
        });
    }

    return {
        selectedEvents,
        localStorageEvents, setLocalStorageEvents,
        createObjectURLEvents, setCreateObjectURLEvents,
        blobEvents, setBlobEvents,
        fetchEvents, setFetchEvents,
        innerHTMLEvents, setInnerHTMLEvents,
        onMessageEvents, setOnMessageEvents,
        urlSearchParamsEvents, setURLSearchParamsEvents,
        countEvents, isSelectedEvent, toggleEvent,
    };
}