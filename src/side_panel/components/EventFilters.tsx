import { Filter, Search, X } from "lucide-react";
import Select from "./Select";
import Option from "./Option";

export interface FilterState {
    apiTypes: Set<string>;
    eventTypes: Set<string>;
}

interface EventFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    eventCount: number;
}

export default function EventFilters({
    searchTerm,
    onSearchChange,
    eventCount,
}: EventFiltersProps) {
    return (
        <div className="flex items-center gap-2 p-2 bg-[#252526] border-b border-[#2d2d30] flex-shrink-0">
            <div className="flex-grow flex flex-row items-center gap-2 px-2  bg-[#3c3c3c] border-[#454545] text-[#cccccc]">
                <Search className="w-3 h-3 text-[#858585]" />
                <input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-7 text-xs placeholder:text-[#858585] border-none outline-none"
                />
            </div>
            {searchTerm && (
                <button
                    onClick={() => onSearchChange("")}
                    className="p-2 hover:bg-[#2a2d3a] cursor-pointer"
                >
                    <X className="w-3 h-3 text-[#858585]" />
                </button>
            )}
            <div className="text-xs text-[#858585]">
                {eventCount} events
            </div>
        </div>
    );
}