import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { sideSidePanelIPC } from "../ipc";
import { md5 } from "js-md5";

export interface UseDOMAPIsValue {
    localStorageEvents: LocalStorageEvent[];
    setLocalStorageEvents: Dispatch<SetStateAction<LocalStorageEvent[]>>;
    createObjectURLEvents: CreateObjectURLEvent[];
    setCreateObjectURLEvents: Dispatch<SetStateAction<CreateObjectURLEvent[]>>;
    blobEvents: BlobEvent_[];
    setBlobEvents: Dispatch<SetStateAction<BlobEvent_[]>>;
    fetchEvents: FetchEvent[];
    setFetchEvents: Dispatch<SetStateAction<FetchEvent[]>>;
    innerHTMLEvents: InnerHTMLEvent[];
    setInnerHTMLEvents: Dispatch<SetStateAction<InnerHTMLEvent[]>>;
    selectedDOMAPIs: DOMAPI[];
    setSelectedDOMAPIs: Dispatch<SetStateAction<DOMAPI[]>>;
}

type Handlers = {
    [K in EventName]: (value: DataOf<K>) => void;
};

export default function useDOMAPIs(): UseDOMAPIsValue {
    const [localStorageEvents, setLocalStorageEvents] = useState<LocalStorageEvent[]>([]);
    const [createObjectURLEvents, setCreateObjectURLEvents] = useState<CreateObjectURLEvent[]>([]);
    const [blobEvents, setBlobEvents] = useState<BlobEvent_[]>([]);
    const [fetchEvents, setFetchEvents] = useState<FetchEvent[]>([]);
    const [innerHTMLEvents, setInnerHTMLEvents] = useState<InnerHTMLEvent[]>([]);
    const [selectedDOMAPIs, setSelectedDOMAPIs] = useState<DOMAPI[]>(["LocalStorage"]);


    const handlersRef = useRef<Handlers>({
        "dom-hack_localStorage": (value) => {
            setLocalStorageEvents(state => [{
                key: value.key,
                value: value.value,
                key_hash: md5(JSON.stringify(value.key)),
                value_hash: md5(JSON.stringify(value.value)),
                created_at: Date(),
                operation: value.operation,
            }, ...state]);
        },
        "dom-hack_URL.createObjectURL": (value) => {
            setCreateObjectURLEvents(state => [{
                type: value.type,
                url: value.url,
            }, ...state]);
        },
        "dom-hack_Blob": (value) => {
            setBlobEvents(state => [{
                type: value.type,
            }, ...state]);
        },
        "dom-hack_fetch": (value) => {
            setFetchEvents(state => [{
                url: value.url,
                method: value.method,
            }, ...state]);
        },
        "dom-hack_innerHTML": (value) => {
            setInnerHTMLEvents(state => [{
                value: value.value,
                operation: value.operation,
            }, ...state]);
        },
    });

    const attachedRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const currentlySelected = new Set(selectedDOMAPIs);

        if (currentlySelected.has("LocalStorage") && !attachedRef.current.has("LocalStorage")) {
            sideSidePanelIPC.on("dom-hack_localStorage", handlersRef.current["dom-hack_localStorage"]);
            attachedRef.current.add("LocalStorage");
        } else if (!currentlySelected.has("LocalStorage") && attachedRef.current.has("LocalStorage")) {
            sideSidePanelIPC.remove("dom-hack_localStorage", handlersRef.current["dom-hack_localStorage"]);
            attachedRef.current.delete("LocalStorage");
        }

        if (currentlySelected.has("CreateObjectURL") && !attachedRef.current.has("CreateObjectURL")) {
            sideSidePanelIPC.on("dom-hack_URL.createObjectURL", handlersRef.current["dom-hack_URL.createObjectURL"]);
            attachedRef.current.add("CreateObjectURL");
        } else if (!currentlySelected.has("CreateObjectURL") && attachedRef.current.has("CreateObjectURL")) {
            sideSidePanelIPC.remove("dom-hack_URL.createObjectURL", handlersRef.current["dom-hack_URL.createObjectURL"]);
            attachedRef.current.delete("CreateObjectURL");
        }

        if (currentlySelected.has("Blob") && !attachedRef.current.has("Blob")) {
            sideSidePanelIPC.on("dom-hack_Blob", handlersRef.current["dom-hack_Blob"]);
            attachedRef.current.add("Blob");
        } else if (!currentlySelected.has("Blob") && attachedRef.current.has("Blob")) {
            sideSidePanelIPC.remove("dom-hack_Blob", handlersRef.current["dom-hack_Blob"]);
            attachedRef.current.delete("Blob");
        }

        if (currentlySelected.has("fetch") && !attachedRef.current.has("fetch")) {
            sideSidePanelIPC.on("dom-hack_fetch", handlersRef.current["dom-hack_fetch"]);
            attachedRef.current.add("fetch");
        } else if (!currentlySelected.has("fetch") && attachedRef.current.has("fetch")) {
            sideSidePanelIPC.remove("dom-hack_fetch", handlersRef.current["dom-hack_fetch"]);
            attachedRef.current.delete("fetch");
        }

        if (currentlySelected.has("innerHTML") && !attachedRef.current.has("innerHTML")) {
            sideSidePanelIPC.on("dom-hack_innerHTML", handlersRef.current["dom-hack_innerHTML"]);
            attachedRef.current.add("innerHTML");
        } else if (!currentlySelected.has("innerHTML") && attachedRef.current.has("innerHTML")) {
            sideSidePanelIPC.remove("dom-hack_innerHTML", handlersRef.current["dom-hack_innerHTML"]);
            attachedRef.current.delete("innerHTML");
        }

        return () => {
            attachedRef.current.forEach(api => {
                if (api === "LocalStorage") {
                    sideSidePanelIPC.remove("dom-hack_localStorage", handlersRef.current["dom-hack_localStorage"]);
                } else if (api === "CreateObjectURL") {
                    sideSidePanelIPC.remove("dom-hack_URL.createObjectURL", handlersRef.current["dom-hack_URL.createObjectURL"]);
                } else if (api === "Blob") {
                    sideSidePanelIPC.remove("dom-hack_Blob", handlersRef.current["dom-hack_Blob"]);
                } else if (api === "fetch") {
                    sideSidePanelIPC.remove("dom-hack_fetch", handlersRef.current["dom-hack_fetch"]);
                } else if (api === "innerHTML") {
                    sideSidePanelIPC.remove("dom-hack_innerHTML", handlersRef.current["dom-hack_innerHTML"]);
                }
            });
            attachedRef.current.clear();
        };
    }, [selectedDOMAPIs]);

    return {
        localStorageEvents, setLocalStorageEvents,
        createObjectURLEvents, setCreateObjectURLEvents,
        blobEvents, setBlobEvents,
        selectedDOMAPIs, setSelectedDOMAPIs,
        fetchEvents, setFetchEvents,
        innerHTMLEvents, setInnerHTMLEvents,
    };
}
