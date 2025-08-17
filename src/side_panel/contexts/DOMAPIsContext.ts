import { createContext } from "react";
import { UseDOMAPIsValue } from "../hooks/useDOMAPIs";

export default createContext<UseDOMAPIsValue>({
    localStorageEvents: [],
    setLocalStorageEvents: () => { },
    createObjectURLEvents: [],
    setCreateObjectURLEvents: () => { },
    blobEvents: [],
    setBlobEvents: () => { },
    selectedDOMAPIs: [],
    setSelectedDOMAPIs: () => { },
    fetchEvents: [],
    setFetchEvents: () => { },
    innerHTMLEvents: [],
    setInnerHTMLEvents: () => { },
});