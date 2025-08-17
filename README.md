# Dom Hack – Chrome Extension

A Chrome extension that watches how websites change by hooking into DOM APIs. Useful for debugging, learning, penetration testing, or tracking content changes.

## What does it do?

It intercepts DOM API calls so you can:

* Track content changes
* Debug pages
* Perform security tests
* Learn how pages work

## How to use

1. Clone the repo
2. Install dependencies:

   ```bash
   npm install
   ```
3. Build the extension:

   ```bash
   npm run build
   ```
4. In Chrome, open `chrome://extensions`, enable **Developer mode**, click **Load Unpacked**, and select the `dist` folder.