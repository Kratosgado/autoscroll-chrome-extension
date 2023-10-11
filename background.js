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
    if (request.action === 'closeTab') {
        alert("closing tab with id: ");
        chrome.tabs.remove(sender.tab.id);
    }
});
chrome.runtime.onMessage.addListener(function (message, sender) {
    if (sender.tab && message.subpageUrls) {
        var subpages = message.subpagesUrls;
        alert("recieved: " + subpages);
    }
});
