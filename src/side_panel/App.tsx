import { useMemo } from "react";
import FrameSelector from "./components/FrameSelector";
import ToolBar from "./components/ToolBar";
import Statistics from "./components/Statistics";
import EventFilters from "./components/EventFilters";
import EventStream from "./components/EventStream";

export default function App() {
    const stats = useMemo(() => {
        const frameEvents = [].filter((e) => e.frameId === "selectedFrameId");
        return {
            totalEvents: frameEvents.length,
            sources: frameEvents.filter((e) => e.type === "Source").length,
            sinks: frameEvents.filter((e) => e.type === "Sink").length,
            transforms: frameEvents.filter((e) => e.type === "Transform").length,
            criticalCount: frameEvents.filter((e) => e.riskLevel === "Critical").length,
            highCount: frameEvents.filter((e) => e.riskLevel === "High").length,
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center bg-zinc-950">
            <ToolBar />
            <FrameSelector frames={mockFrames} onSelectFrame={(frameId) => { }} selectedFrameId="main" />
            <div className="w-full ">
                <Statistics {...stats} />
            </div>

            <div className="w-full flex-grow flex flex-col overflow-hidden">
                <EventFilters
                    searchTerm={"searchTerm"}
                    onSearchChange={(value) => { }}
                    filters={{ apiTypes: new Set(), eventTypes: new Set(), riskLevels: new Set() }}
                    onFiltersChange={(value) => { }}
                    onClear={() => { }}
                    eventCount={0}
                />
                <EventStream
                    events={[]}
                    trackedHashes={new Set()}
                    onTrackHash={(hash) => { }}
                />
            </div>
        </div>
    );
}

// Mock data for demonstration
const mockFrames = [
    {
        id: "main",
        name: "Main Document",
        url: "https://example.com",
        origin: "https://example.com",
        isCrossOrigin: false,
        depth: 0,
        children: [
            {
                id: "frame-1",
                name: "Analytics iframe",
                url: "https://analytics.example.com/tracker",
                origin: "https://analytics.example.com",
                isCrossOrigin: true,
                depth: 1,
            },
            {
                id: "frame-2",
                name: "Payment iframe",
                url: "https://example.com/checkout",
                origin: "https://example.com",
                isCrossOrigin: false,
                depth: 1,
                children: [
                    {
                        id: "frame-2-1",
                        name: "Card validator",
                        url: "https://payments.stripe.com/verify",
                        origin: "https://payments.stripe.com",
                        isCrossOrigin: true,
                        depth: 2,
                    },
                ],
            },
        ],
    },
];
