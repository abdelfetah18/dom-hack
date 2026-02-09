import { useContext } from "react"
import SelectContext from "../contexts/SelectContext";

export default function Option({ id, value, children }) {
    const { currentSelectedItem, showAll, select } = useContext(SelectContext);


    if (showAll) {
        return (
            <div
                onClick={() => { select({ id, value }); }}
                className={`
                    w-full hover:bg-zinc-700 cursor-pointer px-4 py-2 text-gray-50
                    ${currentSelectedItem.id == id ? "bg-zinc-700" : ""}
                    `}
            >{children}</div>
        );
    }

    return null;
}