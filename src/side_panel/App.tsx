import useDOMAPIs from "./hooks/useDOMAPIs";
import DOMAPIsContext from "./contexts/DOMAPIsContext";
import DOMAPIList from "./components/DOMAPIList";

const domAPIs: DOMAPI[] = ["LocalStorage", "CreateObjectURL", "Blob", "fetch", "innerHTML"];

export default function App() {
    const useDOMAPIsValue = useDOMAPIs();

    return (
        <DOMAPIsContext.Provider value={useDOMAPIsValue} >
            <div className="w-full flex flex-col items-center py-8">
                <div className="w-11/12 flex flex-col items-center gap-8">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-xl font-semibold">DOM Hack</div>
                            <div className="text-sm text-gray-700">{"A tool that lets you watch how websites change by hooking into DOM APIs. Great for penetration testing, tracking content, debugging, or learning how pages work."}</div>
                        </div>
                        <div className="w-full flex items-center flex-wrap gap-2">
                            {
                                domAPIs.map((domAPIName, index) => {
                                    const isSelected = useDOMAPIsValue.selectedDOMAPIs.includes(domAPIName);
                                    const count = () => {
                                        switch (domAPIName) {
                                            case "LocalStorage":
                                                return useDOMAPIsValue.localStorageEvents.length;
                                            case "CreateObjectURL":
                                                return useDOMAPIsValue.createObjectURLEvents.length;
                                            case "Blob":
                                                return useDOMAPIsValue.blobEvents.length;
                                            case "fetch":
                                                return useDOMAPIsValue.fetchEvents.length;
                                            case "innerHTML":
                                                return useDOMAPIsValue.innerHTMLEvents.length;
                                            default:
                                                return 0;
                                        }
                                    }

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => useDOMAPIsValue.setSelectedDOMAPIs(state => {
                                                if (state.includes(domAPIName)) {
                                                    return state.filter(name => name != domAPIName);
                                                }

                                                return [...state, domAPIName];
                                            })}
                                            className={`text-sm px-1 border rounded-md cursor-pointer active:scale-95 duration-300 select-none ${isSelected ? "text-purple-700 border-purple-700" : "text-gray-800 border-gray-300"}`}
                                        >{`${domAPIName} (${count()})`}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {useDOMAPIsValue.selectedDOMAPIs.includes("LocalStorage") && (
                        <DOMAPIList
                            apiName="LocalStorage"
                            clear={() => useDOMAPIsValue.setLocalStorageEvents([])}
                            events={useDOMAPIsValue.localStorageEvents}
                            keys={[
                                "key",
                                "value",
                                "operation"
                            ]}
                        />
                    )}
                    {useDOMAPIsValue.selectedDOMAPIs.includes("CreateObjectURL") && (
                        <DOMAPIList
                            apiName="CreateObjectURL"
                            clear={() => useDOMAPIsValue.setCreateObjectURLEvents([])}
                            events={useDOMAPIsValue.createObjectURLEvents}
                            keys={[
                                "type",
                                "url"
                            ]}
                        />
                    )}

                    {useDOMAPIsValue.selectedDOMAPIs.includes("Blob") && (
                        <DOMAPIList
                            apiName="Blob"
                            clear={() => useDOMAPIsValue.setBlobEvents([])}
                            events={useDOMAPIsValue.blobEvents}
                            keys={[
                                "type"
                            ]}
                        />
                    )}

                    {useDOMAPIsValue.selectedDOMAPIs.includes("fetch") && (
                        <DOMAPIList
                            apiName="fetch"
                            clear={() => useDOMAPIsValue.setFetchEvents([])}
                            events={useDOMAPIsValue.fetchEvents}
                            keys={[
                                "url",
                                "method"
                            ]}
                        />
                    )}

                    {useDOMAPIsValue.selectedDOMAPIs.includes("innerHTML") && (
                        <DOMAPIList
                            apiName="innerHTML"
                            clear={() => useDOMAPIsValue.setInnerHTMLEvents([])}
                            events={useDOMAPIsValue.innerHTMLEvents}
                            keys={[
                                "value",
                                "operation"
                            ]}
                        />
                    )}
                </div>
            </div>
        </DOMAPIsContext.Provider>
    );
}

