import DOMAPIList from "./components/DOMAPIList";
import usePage from "./hooks/usePage";

const domAPIs: DOMAPI[] = ["LocalStorage", "CreateObjectURL", "Blob", "fetch", "innerHTML", "onmessage", "URLSearchParams"];

export default function App() {
    const {
        localStorageEvents, setLocalStorageEvents,
        createObjectURLEvents, setCreateObjectURLEvents,
        blobEvents, setBlobEvents,
        fetchEvents, setFetchEvents,
        innerHTMLEvents, setInnerHTMLEvents,
        onMessageEvents, setOnMessageEvents,
        urlSearchParamsEvents, setURLSearchParamsEvents,
        countEvents, isSelectedEvent, toggleEvent,
    } = usePage();

    return (
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
                                const isSelected = isSelectedEvent(domAPIName);
                                const eventsCount = countEvents(domAPIName);

                                return (
                                    <div
                                        key={index}
                                        onClick={() => toggleEvent(domAPIName)}
                                        className={`text-sm px-1 border rounded-md cursor-pointer active:scale-95 duration-300 select-none ${isSelected ? "text-purple-700 border-purple-700" : "text-gray-800 border-gray-300"}`}
                                    >{`${domAPIName} (${eventsCount})`}</div>
                                )
                            })
                        }
                    </div>
                </div>
                {isSelectedEvent("LocalStorage") && (
                    <DOMAPIList
                        apiName="LocalStorage"
                        clear={() => setLocalStorageEvents([])}
                        events={localStorageEvents}
                        keys={[
                            "key",
                            "value",
                            "operation"
                        ]}
                    />
                )}
                {isSelectedEvent("CreateObjectURL") && (
                    <DOMAPIList
                        apiName="CreateObjectURL"
                        clear={() => setCreateObjectURLEvents([])}
                        events={createObjectURLEvents}
                        keys={[
                            "type",
                            "url"
                        ]}
                    />
                )}

                {isSelectedEvent("Blob") && (
                    <DOMAPIList
                        apiName="Blob"
                        clear={() => setBlobEvents([])}
                        events={blobEvents}
                        keys={[
                            "type"
                        ]}
                    />
                )}

                {isSelectedEvent("fetch") && (
                    <DOMAPIList
                        apiName="fetch"
                        clear={() => setFetchEvents([])}
                        events={fetchEvents}
                        keys={[
                            "url",
                            "method"
                        ]}
                    />
                )}

                {isSelectedEvent("innerHTML") && (
                    <DOMAPIList
                        apiName="innerHTML"
                        clear={() => setInnerHTMLEvents([])}
                        events={innerHTMLEvents}
                        keys={[
                            "value",
                            "operation"
                        ]}
                    />
                )}

                {isSelectedEvent("onmessage") && (
                    <DOMAPIList
                        apiName="onmessage"
                        clear={() => setOnMessageEvents([])}
                        events={onMessageEvents}
                        keys={[
                            "data"
                        ]}
                    />
                )}

                {isSelectedEvent("URLSearchParams") && (
                    <DOMAPIList
                        apiName="URLSearchParams"
                        clear={() => setURLSearchParamsEvents([])}
                        events={urlSearchParamsEvents}
                        keys={[
                            "key",
                            "value",
                            "operation"
                        ]}
                    />
                )}
            </div>
        </div>
    );
}

