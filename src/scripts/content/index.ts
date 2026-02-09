import ContentInjectedScriptEndpoint from "./ContentInjectedScriptEndpoint";
import { ContentSidePanelEndpoint } from "./ContentSidePanelEndpoint";

function injectScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
}

const contentInjectedScriptEndpoint = new ContentInjectedScriptEndpoint(window);
const contentSidePanelEndpoint = new ContentSidePanelEndpoint();
contentSidePanelEndpoint.connect();

contentInjectedScriptEndpoint.on("dom-hack_register-frame", (data) => { contentSidePanelEndpoint.send("dom-hack_register-frame", data); });
contentInjectedScriptEndpoint.on("dom-hack_data-flow-event", (data) => { contentSidePanelEndpoint.send("dom-hack_data-flow-event", data); });

contentSidePanelEndpoint.on("dom-hack_start-data-flow-event", () => { contentInjectedScriptEndpoint.send("dom-hack_start-data-flow-event", undefined); });
contentSidePanelEndpoint.on("dom-hack_pause-data-flow-event", () => { contentInjectedScriptEndpoint.send("dom-hack_pause-data-flow-event", undefined); });

const scriptURL = chrome.runtime.getURL('scripts/injected.js');
injectScript(scriptURL);
