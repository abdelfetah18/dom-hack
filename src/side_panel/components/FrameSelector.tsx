import { ChevronDown, ChevronRight, Globe, Lock } from "lucide-react";
import { useState } from "react";

export interface FrameNode {
    id: string;
    name: string;
    url: string;
    origin: string;
    isCrossOrigin: boolean;
    children?: FrameNode[];
    depth: number;
}

interface FrameSelectorProps {
    frames: FrameNode[];
    selectedFrameId: string;
    onSelectFrame: (frameId: string) => void;
}

export default function FrameSelector({ frames, selectedFrameId, onSelectFrame }: FrameSelectorProps) {
    const [expandedFrames, setExpandedFrames] = useState<Set<string>>(new Set(["main"]));

    const toggleExpand = (frameId: string) => {
        setExpandedFrames((prev) => {
            const next = new Set(prev);
            if (next.has(frameId)) {
                next.delete(frameId);
            } else {
                next.add(frameId);
            }
            return next;
        });
    };

    const renderFrame = (frame: FrameNode) => {
        const isExpanded = expandedFrames.has(frame.id);
        const isSelected = selectedFrameId === frame.id;
        const hasChildren = frame.children && frame.children.length > 0;

        return (
            <div key={frame.id}>
                <div
                    className={`flex items-center gap-1 px-2 py-1 text-xs cursor-pointer hover:bg-[#2a2d3a] transition-colors ${isSelected ? "bg-[#2e4455]" : ""}`}
                    style={{ paddingLeft: `${8 + frame.depth * 16}px` }}
                    onClick={() => onSelectFrame(frame.id)}
                >
                    {hasChildren && (
                        <button
                            className="p-0 hover:bg-transparent"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(frame.id);
                            }}
                        >
                            {isExpanded ? (
                                <ChevronDown className="w-3 h-3 text-[#9da5b4]" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-[#9da5b4]" />
                            )}
                        </button>
                    )}
                    {!hasChildren && <span className="w-3" />}

                    {frame.isCrossOrigin ? (
                        <Globe className="w-3 h-3 text-[#f48771]" />
                    ) : (
                        <Lock className="w-3 h-3 text-[#7ec699]" />
                    )}

                    <span className="flex-1 truncate text-[#cccccc]">{frame.name}</span>

                    {frame.isCrossOrigin && (
                        <div className="text-[10px] px-1 h-4 bg-[#3c2c1f] border-[#f48771] text-[#f48771] border rounded-full">
                            cross-origin
                        </div>
                    )}
                </div>

                {isExpanded && hasChildren && (
                    <div>
                        {frame.children?.map((child) => renderFrame(child))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-[#1e1e1e] border-b border-[#2d2d30]">
            <div className="px-2 py-1.5 text-xs font-medium text-[#cccccc] bg-[#252526] border-b border-[#2d2d30]">
                Frame Context
            </div>
            <div className="max-h-32 overflow-y-auto">
                {frames.map((frame) => renderFrame(frame))}
            </div>
        </div>
    );
}
