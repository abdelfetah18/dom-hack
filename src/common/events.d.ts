type EventName =
    "dom-hack_localStorage" |
    "dom-hack_URL.createObjectURL" |
    "dom-hack_Blob" |
    "dom-hack_fetch" |
    "dom-hack_innerHTML";

type EventDataMap = {
    "dom-hack_localStorage": { key: string; value: string; operation: "getItem" | "setItem"; };
    "dom-hack_URL.createObjectURL": { url: string; type: string; };
    "dom-hack_Blob": { type: string; };
    "dom-hack_fetch": { url: string; method: string; };
    "dom-hack_innerHTML": { value: string; operation: "get" | "set" };
}

type DataOf<E extends EventName> = EventDataMap[E]
