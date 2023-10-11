// listen for message request and return options
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getOptions') {
        // simulate getting options
        var options = {
            scrollTimeStart: 10,
            scrollTimeEnd: 20,
            tabsMin: 1,
            tabsMax: 3,
            subpagesMin: 1,
            subpagesMax: 5,
        };
        sendResponse({ options: options });
    }
    if (request === 'closeTab') {
        chrome.tabs.remove(sender.tab.id);
    }

    if (request.message === 'scroll') {
        console.log('gotten');

        chrome.scripting.registerContentScripts([{
            id: "session-script",
            js: ["auto.js"],
            persistAcrossSessions: false,
            // matches: ["*://example.com/*"],
            runAt: "document_start",
        }])
        .then(() => console.log("registration complete"))
        .catch((err) => console.warn("unexpected error", err))
    }
});