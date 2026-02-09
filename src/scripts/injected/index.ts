import LocalStorageHook from "./hooks/LocalStorageHook";
import CreateObjectURLHook from "./hooks/CreateObjectURLHook";
import BlobHook from "./hooks/BlobHook";
import FetchHook from "./hooks/FetchHook";
import InnerHTMLHook from "./hooks/InnerHTMLHook";
import OnMessageHook from "./hooks/OnMessageHook";
import URLSearchParamsHook from "./hooks/URLSearchParamsHook";
import InjectedScriptEndpoint from "./InjectedScriptEndpoint";

const frameNode: FrameNode = {
    id: crypto.randomUUID(),
    url: window.location.href,
    isCrossOrigin: false,
    name: window.document.title,
    origin: window.origin,
    depth: 0,
};

const injectedScriptEndpoint = new InjectedScriptEndpoint(window);

const localStorageHook = new LocalStorageHook(injectedScriptEndpoint, frameNode);
const createObjectURLHook = new CreateObjectURLHook(injectedScriptEndpoint, frameNode);
const blobHook = new BlobHook(injectedScriptEndpoint, frameNode);
const fetchHook = new FetchHook(injectedScriptEndpoint, frameNode);
const innerHTMLHook = new InnerHTMLHook(injectedScriptEndpoint, frameNode);
const onMessageHook = new OnMessageHook(injectedScriptEndpoint, frameNode);
const urlSearchParamsHook = new URLSearchParamsHook(injectedScriptEndpoint, frameNode);

injectedScriptEndpoint.send("dom-hack_register-frame", frameNode);
injectAll();

injectedScriptEndpoint.on("dom-hack_start-data-flow-event", injectAll);
injectedScriptEndpoint.on("dom-hack_pause-data-flow-event", resetAll);

function injectAll(): void {
    localStorageHook.inject();
    createObjectURLHook.inject();
    blobHook.inject();
    fetchHook.inject();
    innerHTMLHook.inject();
    onMessageHook.inject();
    urlSearchParamsHook.inject();
}

function resetAll(): void {
    localStorageHook.reset();
    createObjectURLHook.reset();
    blobHook.reset();
    fetchHook.reset();
    innerHTMLHook.reset();
    onMessageHook.reset();
    urlSearchParamsHook.reset();
}

// Test Hock
// function getMethods(api: any) {
//     const proto = Object.getPrototypeOf(api);
//     return Object.getOwnPropertyNames(proto)
//         .filter(name => {
//             const desc = Object.getOwnPropertyDescriptor(proto, name);
//             if (
//                 desc &&
//                 typeof desc.value === 'function' &&
//                 name != "constructor"
//             ) {
//                 return true;
//             }

//             return false;
//         });
// }

// function hook(api: any) {
//     const methods: any = getMethods(api);

//     const object: Record<any, any> = {};
//     for (let method of methods) {
//         object[method] = api[method].bind(api);
//         api[method] = function (...args: any[]) {
//             const result = object[method](...args);
//             console.log(`dom-hack: window.localStorage.getItem(${args.join(", ")}) => ${result}`);
//             return result;
//         }
//     }

//     return object;
// }
