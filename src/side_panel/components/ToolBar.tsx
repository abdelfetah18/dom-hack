import { Activity, Pause, Play, Settings, Trash2 } from "lucide-react";

export default function ToolBar() {
    const isRecording = true;
    return (
        <div className="w-full flex flex-row items-center justify-between p-2 bg-[#252526] border-b border-[#2d2d30]">
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <div className="text-gray-50">DOM Hack</div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-green-300 bg-green-950 border-green-300 border rounded-full text-xs px-2">{isRecording ? "Recording" : "Paused"}</div>
                <div className={`${isRecording
                    ? "text-[#f48771] hover:bg-[#3c1f1f]"
                    : "text-[#7ec699] hover:bg-[#1e3a20]"
                    }`}>
                    {isRecording ? (
                        <Pause className="w-3.5 h-3.5" />
                    ) : (
                        <Play className="w-3.5 h-3.5" />
                    )}
                </div>
                <div className="text-[#cccccc] hover:bg-[#2a2d3a] disabled:opacity-30">
                    <Trash2 className="w-3.5 h-3.5" />
                </div>

                <div className="w-px h-5 bg-[#2d2d30]" />
                <div className="text-[#cccccc] hover:bg-[#2a2d3a]">
                    <Settings className="w-3.5 h-3.5" />
                </div>
            </div>
        </div>
    )
}