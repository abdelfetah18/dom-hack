import { useState } from "react";
import TableHead from "./TableHead";

interface DOMAPIListProps {
    apiName: DOMAPI;
    keys: string[];
    clear: () => void;
    events: any[];
}

export default function DOMAPIList({ apiName, keys, events, clear }: DOMAPIListProps) {
    const [query, setQuery] = useState("");

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full flex items-center">
                <div className="text-xl font-semibold">{apiName}</div>
            </div>
            <div className="w-full flex items-center gap-2">
                <div className="text-sm border border-gray-300 rounded-md px-2">
                    <input value={query} onChange={(ev) => setQuery(ev.target.value)} type="text" placeholder="Search" className="outline-none" />
                </div>
                <div onClick={clear} className="border border-gray-300 text-gray-600 text-sm px-3 rounded-full cursor-pointer active:scale-95 duration-300 select-none">Clear</div>
            </div>
            <div className="w-full max-h-96 flex flex-col items-center rounded-xl overflow-auto">
                <TableHead values={keys} />
                <div className="w-full flex-col">
                    {
                        events.filter(event => {
                            const names = Object.getOwnPropertyNames(event).filter(p => !p.includes("hash") && p != "created_at");
                            for (let name of names) {
                                if (event[name].includes(query)) {
                                    return true;
                                }
                            }

                            return false;
                        }).map((event, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`w-full grid border-gray-300 border-b last:border-none py-2`}
                                    style={{
                                        gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))`
                                    }}
                                >
                                    {
                                        keys.map((key, index) => {
                                            return (
                                                <div key={index} className="px-4 w-full break-words">{event[key]}</div>
                                            );
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}