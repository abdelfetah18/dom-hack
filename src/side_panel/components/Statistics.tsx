import { BarChart3, TrendingUp, AlertTriangle, Target } from "lucide-react";

interface StatisticsProps {
    totalEvents: number;
    sources: number;
    sinks: number;
    transforms: number;
    criticalCount: number;
    highCount: number;
}

export default function Statistics({
    totalEvents,
    sources,
    sinks,
    transforms,
    criticalCount,
    highCount,
}: StatisticsProps) {
    return (
        <div className="bg-[#1e1e1e] border-t border-[#2d2d30]">
            <div className="px-2 py-1.5 text-xs font-medium text-[#cccccc] bg-[#252526] border-b border-[#2d2d30]">
                Statistics
            </div>

            <div className="p-2 grid grid-cols-2 gap-2">
                <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                    <div className="flex items-center gap-1 mb-1">
                        <BarChart3 className="w-3 h-3 text-[#4fc1ff]" />
                        <span className="text-[10px] text-[#858585]">Total Events</span>
                    </div>
                    <div className="text-lg font-medium text-[#cccccc]">{totalEvents}</div>
                </div>

                <div className="bg-[#252526] p-2 rounded border border-[#2d2d30]">
                    <div className="flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3 h-3 text-[#f48771]" />
                        <span className="text-[10px] text-[#858585]">High Risk</span>
                    </div>
                    <div className="text-lg font-medium text-[#f48771]">
                        {criticalCount + highCount}
                    </div>
                </div>

                <div className="col-span-2 bg-[#252526] p-2 rounded border border-[#2d2d30]">
                    <div className="flex items-center gap-1 mb-2">
                        <Target className="w-3 h-3 text-[#c594c5]" />
                        <span className="text-[10px] text-[#858585]">Event Distribution</span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#cccccc]">Sources</span>
                            <div className="text-[9px] px-1.5 h-4 bg-[#1f2d3c] border-[#4fc1ff] text-[#4fc1ff]">
                                {sources}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#cccccc]">Transforms</span>
                            <div className="text-[9px] px-1.5 h-4 bg-[#2d1f3c] border-[#c594c5] text-[#c594c5]">
                                {transforms}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#cccccc]">Sinks</span>
                            <div className="text-[9px] px-1.5 h-4 bg-[#3c1f1f] border-[#f48771] text-[#f48771]">
                                {sinks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}