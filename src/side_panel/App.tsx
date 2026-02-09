import { useMemo } from "react";
import FrameSelector from "./components/FrameSelector";
import ToolBar from "./components/ToolBar";
import Statistics from "./components/Statistics";
import EventFilters from "./components/EventFilters";
import EventStream from "./components/EventStream";
import useFrames from "./hooks/useFrames";

export default function App() {
    const {
        frames,
        selectedFrameId,
        onSelectFrame,
        dataFlowEvents,
        isRecording,
        onToggleRecord,
        onClear,
        searchTerm,
        onSearchChange,
    } = useFrames();

    const frameEvents = dataFlowEvents.filter((e) => e.frameId === selectedFrameId);
    const stats = {
        totalEvents: frameEvents.length,
        sources: frameEvents.filter((e) => e.type === "Source").length,
        sinks: frameEvents.filter((e) => e.type === "Sink").length,
        transforms: frameEvents.filter((e) => e.type === "Transform").length,
    };

    const filteredEvents = useMemo(() => {
        let filtered = dataFlowEvents.filter((event) => event.frameId === selectedFrameId);

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (event) =>
                    event.api.toLowerCase().includes(term) ||
                    event.value?.toLowerCase().includes(term) ||
                    event.location.toLowerCase().includes(term) ||
                    event.hash?.toLowerCase().includes(term)
            );
        }

        return filtered;
    }, [dataFlowEvents, selectedFrameId, searchTerm]);

    return (
        <div className="w-full h-full flex flex-col items-center bg-zinc-950">
            <ToolBar isRecording={isRecording} onToggleRecord={onToggleRecord} onClear={onClear} />
            <FrameSelector frames={frames} onSelectFrame={onSelectFrame} selectedFrameId={selectedFrameId} />
            <div className="w-full ">
                <Statistics {...stats} />
            </div>

            <div className="w-full flex-grow flex flex-col overflow-hidden">
                <EventFilters
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                    eventCount={filteredEvents.length}
                />
                <EventStream
                    events={filteredEvents}
                    trackedHashes={new Set()}
                    onTrackHash={(hash) => { }}
                />
            </div>
        </div>
    );
}