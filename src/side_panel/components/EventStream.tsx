import {
    ArrowRight,
    AlertTriangle,
    XCircle,
    AlertCircle,
    Info,
    ChevronRight,
    ChevronDown,
    Hash,
    Copy,
    Eye,
} from "lucide-react";
import { useState } from "react";

interface EventStreamProps {
    events: DataFlowEvent[];
    trackedHashes: Set<string>;
    onTrackHash?: (hash: string) => void;
}

export default function EventStream({ events, trackedHashes, onTrackHash }: EventStreamProps) {
    const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
    const [copiedHash, setCopiedHash] = useState<string | null>(null);

    const toggleExpand = (eventId: string) => {
        setExpandedEvents((prev) => {
            const next = new Set(prev);
            if (next.has(eventId)) {
                next.delete(eventId);
            } else {
                next.add(eventId);
            }
            return next;
        });
    };

    const handleCopyHash = (hash: string) => {
        navigator.clipboard.writeText(hash);
        setCopiedHash(hash);
        setTimeout(() => setCopiedHash(null), 2000);
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case "Critical":
                return "text-[#f48771] border-[#f48771] bg-[#3c1f1f]";
            case "High":
                return "text-[#f6c177] border-[#f6c177] bg-[#3c331f]";
            case "Medium":
                return "text-[#ffcc66] border-[#ffcc66] bg-[#3c381f]";
            case "Low":
                return "text-[#7ec699] border-[#7ec699] bg-[#1e3a20]";
            default:
                return "text-[#858585] border-[#858585] bg-[#2d2d30]";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Source":
                return "text-[#4fc1ff] border-[#4fc1ff] bg-[#1f2d3c]";
            case "Transform":
                return "text-[#c594c5] border-[#c594c5] bg-[#2d1f3c]";
            case "Sink":
                return "text-[#f48771] border-[#f48771] bg-[#3c1f1f]";
            default:
                return "text-[#858585] border-[#858585] bg-[#2d2d30]";
        }
    };

    const getRiskIcon = (level: string) => {
        switch (level) {
            case "Critical":
                return <XCircle className="w-3 h-3" />;
            case "High":
                return <AlertTriangle className="w-3 h-3" />;
            case "Medium":
                return <AlertCircle className="w-3 h-3" />;
            case "Low":
                return <Info className="w-3 h-3" />;
            default:
                return <Info className="w-3 h-3" />;
        }
    };

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="flex-1 min-h-0 bg-[#1e1e1e] overflow-auto">
            <div className="h-full">
                <div className="divide-y divide-[#2d2d30]">
                    {events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <Info className="w-8 h-8 text-[#858585] mb-2" />
                            <p className="text-sm text-[#858585]">No events captured yet</p>
                            <p className="text-xs text-[#6e6e6e] mt-1">
                                Data flow events will appear here in real-time
                            </p>
                        </div>
                    ) : (
                        events.map((event) => {
                            const isExpanded = expandedEvents.has(event.id);
                            const isTracked = event.hash && trackedHashes.has(event.hash);

                            return (
                                <div
                                    key={event.id}
                                    className={`p-2 hover:bg-[#2a2d3a] transition-colors ${isTracked ? "bg-[#1e2a3a] border-l-2 border-l-[#4fc1ff]" : ""}`}
                                >
                                    <div
                                        className="flex items-start gap-2 cursor-pointer"
                                        onClick={() => toggleExpand(event.id)}
                                    >
                                        <button className="mt-0.5 p-0">
                                            {isExpanded ? (
                                                <ChevronDown className="w-3 h-3 text-[#9da5b4]" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3 text-[#9da5b4]" />
                                            )}
                                        </button>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div
                                                    className={`text-[9px] px-1 h-4 ${getTypeColor(event.type)}`}
                                                >
                                                    {event.type}
                                                </div>

                                                <span className="text-xs font-mono text-[#cccccc]">{event.api}</span>

                                                {isTracked && (
                                                    <div className="text-[9px] px-1 h-4 bg-[#1f2d3c] border-[#4fc1ff] text-[#4fc1ff] flex items-center gap-0.5">
                                                        <Hash className="w-2.5 h-2.5" />
                                                        Tracked
                                                    </div>
                                                )}

                                                <span className="text-[10px] text-[#6e6e6e] ml-auto">
                                                    {formatTimestamp(event.timestamp)}
                                                </span>
                                            </div>

                                            <div className="text-xs text-[#858585] truncate mb-1">
                                                {event.frameName}
                                            </div>

                                            <div className="font-mono text-[11px] text-[#ce9178] truncate">
                                                "{event.value}"
                                            </div>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-2 ml-5 space-y-2 text-xs">
                                            {event.hash && (
                                                <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                                                    <div className="text-[10px] text-[#6e6e6e] mb-1">Value Hash</div>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="flex-1 font-mono text-[11px] text-[#4fc1ff] cursor-pointer hover:text-[#6eb8ff] transition-colors truncate"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCopyHash(event.hash!);
                                                            }}
                                                            title="Click to copy"
                                                        >
                                                            {event.hash}
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCopyHash(event.hash!);
                                                                }}
                                                                className="h-5 px-1 text-[#858585] hover:text-[#cccccc] hover:bg-[#2a2d3a]"
                                                            >
                                                                <Copy className="w-3 h-3" />
                                                            </button>
                                                            {!isTracked && onTrackHash && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onTrackHash(event.hash!);
                                                                    }}
                                                                    className="h-5 px-1 text-[#4fc1ff] hover:text-[#6eb8ff] hover:bg-[#1f2d3c]"
                                                                    title="Track this value"
                                                                >
                                                                    <Eye className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {copiedHash === event.hash && (
                                                        <div className="text-[9px] text-[#7ec699] mt-1">Copied to clipboard!</div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                                                <div className="text-[10px] text-[#6e6e6e] mb-1">Location</div>
                                                <div className="font-mono text-[11px] text-[#cccccc]">{event.location}</div>
                                            </div>

                                            {event.metadata && Object.keys(event.metadata).length > 0 && (
                                                <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                                                    <div className="text-[10px] text-[#6e6e6e] mb-1">Metadata</div>
                                                    <div className="space-y-1">
                                                        {Object.entries(event.metadata).map(([key, value]) => (
                                                            <div key={key} className="flex gap-2">
                                                                <span className="text-[11px] text-[#9cdcfe]">{key}:</span>
                                                                <span className="text-[11px] text-[#ce9178]">"{value}"</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {event.stackTrace && event.stackTrace.length > 0 && (
                                                <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                                                    <div className="text-[10px] text-[#6e6e6e] mb-1">Stack Trace</div>
                                                    <div className="space-y-0.5">
                                                        {event.stackTrace.map((line, idx) => (
                                                            <div key={idx} className="font-mono text-[10px] text-[#858585]">
                                                                {line}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}