import { Filter, Search, X } from "lucide-react";
import Select from "./Select";
import Option from "./Option";

export interface FilterState {
    apiTypes: Set<string>;
    riskLevels: Set<string>;
    eventTypes: Set<string>;
}

interface EventFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClear: () => void;
    eventCount: number;
}

export default function EventFilters({
    searchTerm,
    onSearchChange,
    filters,
    onFiltersChange,
    onClear,
    eventCount,
}: EventFiltersProps) {
    const apiTypes = ["URLSearchParams", "postMessage", "innerHTML", "outerHTML", "setAttribute", "fetch"];
    const riskLevels = ["Critical", "High", "Medium", "Low"];
    const eventTypes = ["Source", "Transform", "Sink"];

    const toggleFilter = (category: keyof FilterState, value: string) => {
        const newFilters = { ...filters };
        const categorySet = new Set(newFilters[category]);

        if (categorySet.has(value)) {
            categorySet.delete(value);
        } else {
            categorySet.add(value);
        }

        newFilters[category] = categorySet;
        onFiltersChange(newFilters);
    };

    const activeFilterCount =
        filters.apiTypes.size + filters.riskLevels.size + filters.eventTypes.size;

    return (
        <div className="flex items-center gap-2 p-2 bg-[#252526] border-b border-[#2d2d30] flex-shrink-0">
            <div className="flex-grow flex flex-row items-center gap-2 px-2  bg-[#3c3c3c] border-[#454545] text-[#cccccc]">
                <Search className="w-3 h-3 text-[#858585]" />
                <input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-7 text-xs placeholder:text-[#858585]"
                />
            </div>
            {searchTerm && (
                <button
                    onClick={() => onSearchChange("")}
                    className="w-5 p-0 hover:bg-[#2a2d3a]"
                >
                    <X className="w-3 h-3 text-[#858585]" />
                </button>
            )}
            {activeFilterCount > 0 && (
                <button
                    onClick={onClear}
                    className="h-7 px-2 text-xs text-[#858585] hover:text-[#cccccc] hover:bg-[#2a2d3a]"
                >
                    Clear
                </button>
            )}

            <div className="text-xs text-[#858585]">
                {eventCount} events
            </div>
        </div>
    );
}