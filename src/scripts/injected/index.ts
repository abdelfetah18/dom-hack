import { ContentIPC } from "../../common/ContentIPC";

import LocalStorageHook from "./hooks/LocalStorageHook";
import CreateObjectURLHook from "./hooks/CreateObjectURLHook";
import BlobHook from "./hooks/BlobHook";
import FetchHook from "./hooks/FetchHook";
import InnerHTMLHook from "./hooks/InnerHTMLHook";

const contentIPC = new ContentIPC(window);

const localStorageHook = new LocalStorageHook(contentIPC);
const createObjectURLHook = new CreateObjectURLHook(contentIPC);
const blobHook = new BlobHook(contentIPC);
const fetchHook = new FetchHook(contentIPC);
const innerHTMLHook = new InnerHTMLHook(contentIPC);

localStorageHook.inject();
createObjectURLHook.inject();
blobHook.inject();
fetchHook.inject();
innerHTMLHook.inject();

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
