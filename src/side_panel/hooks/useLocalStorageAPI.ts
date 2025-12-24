import { useEffect, useState } from "react";
import { md5 } from "js-md5";
import { sideSidePanelIPC } from "../ipc";

export default function useLocalStorageAPI(isSelected: boolean) {
    const [localStorageEvents, setLocalStorageEvents] = useState<LocalStorageEvent[]>([]);

    function callback(value) {
        setLocalStorageEvents(state => [{
            key: value.key,
            value: value.value,
            key_hash: md5(JSON.stringify(value.key)),
            value_hash: md5(JSON.stringify(value.value)),
            created_at: Date(),
            operation: value.operation,
        }, ...state]);
    }

    useEffect(() => {
        if (isSelected) {
            sideSidePanelIPC.on("dom-hack_localStorage", callback);
        } else {
            sideSidePanelIPC.remove("dom-hack_localStorage", callback);
        }
        return () => {
            sideSidePanelIPC.remove("dom-hack_localStorage", callback);
        };
    }, [isSelected]);

    return { localStorageEvents, setLocalStorageEvents };
}