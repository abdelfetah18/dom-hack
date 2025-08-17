type DOMAPI = "LocalStorage" | "CreateObjectURL" | "Blob" | "fetch" | "innerHTML";

interface Value {
    value: string;
    value_hash: string;
    created_at: string;
}

type LocalStorageOperation = "getItem" | "setItem";

interface LocalStorageEvent extends Value {
    key: string;
    key_hash: string;
    operation: LocalStorageOperation;
}

interface CreateObjectURLEvent {
    url: string;
    type: string;
}

interface BlobEvent_ {
    type: string;
}

interface FetchEvent {
    url: string;
    method: string;
}

interface InnerHTMLEvent {
    value: string;
    operation: "get" | "set";
}