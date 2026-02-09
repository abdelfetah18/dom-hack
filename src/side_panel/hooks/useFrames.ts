import { useEffect, useState } from "react";
import { sidepanelEndpoint } from "../ipc";

export default function useFrames() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFrameId, setSelectedFrameId] = useState("");
    const [frames, setFrames] = useState<FrameNode[]>([]);
    const [dataFlowEvents, setDataFlowEvents] = useState<DataFlowEvent[]>([]);

    const [isRecording, setIsRecording] = useState(false);

    const onRegisterFrameNode = (frameNode: FrameNode) => {
        setFrames(state => [...state, frameNode]);
        setIsRecording(true);
    };

    const onNewDataFlowEvent = (dataFlowEvent: DataFlowEvent) => {
        setDataFlowEvents(state => [...state, dataFlowEvent]);
    };

    const onSelectFrame = (frameId: string): void => {
        setSelectedFrameId(frameId);
    }

    const onToggleRecord = (): void => {
        setIsRecording(state => {
            if (state) {
                sidepanelEndpoint.send("dom-hack_pause-data-flow-event", undefined);
                return false;
            }

            sidepanelEndpoint.send("dom-hack_start-data-flow-event", undefined);
            return true;
        });
    }

    const onClear = (): void => {
        setDataFlowEvents([]);
    }

    const onSearchChange = (value: string): void => {
        setSearchTerm(value);
    }

    useEffect(() => {
        sidepanelEndpoint.on("dom-hack_register-frame", onRegisterFrameNode);
        sidepanelEndpoint.on("dom-hack_data-flow-event", onNewDataFlowEvent);
        sidepanelEndpoint.onDelete((tabId) => {
            const removedFramesIds = [];
            setFrames(state => state.filter(frame => {
                const doKeep = frame.tabId != tabId;
                if (!doKeep) {
                    removedFramesIds.push(frame.id);
                }
                return doKeep;
            }));
            setDataFlowEvents(state => state.filter(event => !removedFramesIds.includes(event.frameId)));
        });

        return () => {
            sidepanelEndpoint.remove("dom-hack_register-frame", onRegisterFrameNode);
            sidepanelEndpoint.remove("dom-hack_data-flow-event", onNewDataFlowEvent);
        };
    }, []);

    return {
        frames,
        selectedFrameId,
        onSelectFrame,
        dataFlowEvents,
        isRecording,
        onToggleRecord,
        onClear,
        searchTerm,
        onSearchChange,
    };
}