import { ContentIPC } from "../../../common/ContentIPC";

export default abstract class APIHook {
    constructor(public contentIPC: ContentIPC) { }
    
    abstract inject(): void;
    abstract reset(): void;
}