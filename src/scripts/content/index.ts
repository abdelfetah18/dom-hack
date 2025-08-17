import { ContentIPC } from "../../common/ContentIPC";
import { SidePanelIPC } from "../../common/SidePanelIPC";

function injectScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
}

const contentIPC = new ContentIPC(window);
const sideSidePanelIPC = new SidePanelIPC();

contentIPC.on("dom-hack_localStorage", (data) => { sideSidePanelIPC.send("dom-hack_localStorage", data); });
contentIPC.on("dom-hack_URL.createObjectURL", (data) => { sideSidePanelIPC.send("dom-hack_URL.createObjectURL", data); });
contentIPC.on("dom-hack_Blob", (data) => { sideSidePanelIPC.send("dom-hack_Blob", data); });
contentIPC.on("dom-hack_fetch", (data) => { sideSidePanelIPC.send("dom-hack_fetch", data); });
contentIPC.on("dom-hack_innerHTML", (data) => { sideSidePanelIPC.send("dom-hack_innerHTML", data); });

const scriptURL = chrome.runtime.getURL('scripts/injected.js');
injectScript(scriptURL);
