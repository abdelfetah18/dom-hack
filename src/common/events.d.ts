type EventName =
    "dom-hack_register-frame" |
    "dom-hack_data-flow-event" |
    "dom-hack_pause-data-flow-event" |
    "dom-hack_start-data-flow-event";

type EventDataMap = {
    "dom-hack_register-frame": FrameNode;
    "dom-hack_data-flow-event": DataFlowEvent;
    "dom-hack_pause-data-flow-event": void;
    "dom-hack_start-data-flow-event": void;
}

type DataOf<E extends EventName> = EventDataMap[E]

type APIType = "Source" | "Transform" | "Sink";

interface DataFlowEvent {
    id: string;
    tabId?: number;
    timestamp: number;
    frameId: string;
    frameName: string;
    type: APIType;
    api: string;
    value: string;
    hash?: string;
    location: string;
    stackTrace?: string[];
    metadata?: Record<string, string>;
}

interface FrameNode {
    id: string;
    tabId?: number;
    name: string;
    url: string;
    origin: string;
    isCrossOrigin: boolean;
    children?: FrameNode[];
    depth: number;
}