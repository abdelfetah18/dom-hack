import InjectedScriptEndpoint from "../InjectedScriptEndpoint";

export default abstract class APIHook {
    constructor(public injectedScriptEndpoint: InjectedScriptEndpoint, public frameNode: FrameNode) { }

    abstract API_NAME: string;
    abstract inject(): void;
    abstract reset(): void;

    createDataFlowEvent(
        value: string,
        type: APIType,
        metadata?: any,
    ): DataFlowEvent {
        return {
            id: crypto.randomUUID(),
            api: this.API_NAME,
            frameId: this.frameNode.id,
            frameName: this.frameNode.name,
            timestamp: Date.now(),
            location: "",
            type,
            value,
            metadata,
        };
    }
}