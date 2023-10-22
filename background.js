
// listen for message request and return options
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    
    if (message.action === 'closeTab') {
        chrome.tabs.remove(sender.tab.id);
    }

    if (message.action === 'startScroll') { 
        // Send a message to the content script to trigger scrolling
        chrome.tabs.sendMessage(sender.tab.id, { action: 'scroll', options: message.options });
    }

    if (message.action === "openSubPage") {
        // create a new tab
         chrome.tabs.create({ url: message.url }, async function (tab) {
            chrome.tabs.sendMessage(tab.id, {action: "scroll", options: message.options})
        })
    }

    if (message.action === 'scroller') {
        console.log('gotten');

        await chrome.scripting.registerContentScripts([{
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
