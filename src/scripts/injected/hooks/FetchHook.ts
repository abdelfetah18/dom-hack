import APIHook from "./APIHook";

export default class FetchHook extends APIHook {
    API_NAME: string = "fetch";

    static OriginalFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

    inject(): void {
        const injectedScriptEndpoint = this.injectedScriptEndpoint;

        FetchHook.OriginalFetch = window.fetch.bind(window);

        window.fetch = (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> => {
            let url = "";
            let method = "";
            if (input instanceof URL) {
                url = input.href;
                method = init?.method || "GET";
            } else if (input instanceof globalThis.Request) {
                url = input.url;
                method = input.method;
            } else {
                url = input;
                method = init?.method || "GET";
            }

            injectedScriptEndpoint.send(
                "dom-hack_data-flow-event",
                this.createDataFlowEvent(
                    url,
                    "Source",
                    { url, method },
                ),
            );

            return FetchHook.OriginalFetch(input, init);
        }
    }

    reset(): void {
        window.fetch = FetchHook.OriginalFetch;
    }
}