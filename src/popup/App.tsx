export default function App() {
    const openPanel = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.sidePanel.open({ tabId: tab.id });
    }

    return (
        <div className="w-96 h-fit flex flex-col p-4 gap-8">
            <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-semibold">DOM Hack</div>
                <div className="text-sm text-gray-700">{"A tool that lets you watch how websites change by hooking into DOM APIs. Great for penetration testing, tracking content, debugging, or learning how pages work."}</div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div onClick={openPanel} className="bg-purple-600 hover:bg-purple-500 cursor-pointer text-white font-semibold flex items-center justify-center rounded-full py-2">Open Side Panel</div>
            </div>
        </div>
    );
}