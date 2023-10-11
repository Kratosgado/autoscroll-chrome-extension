// listen for message request and return options
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var _a, _b;
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
        alert("closing tab with id: ".concat((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id));
        chrome.tabs.remove((_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id);
    }
});
chrome.runtime.onMessage.addListener(function (message, sender) {
    if (sender.tab && message.subpageUrls) {
        var subpages = message.subpagesUrls;
        alert("recieved: " + subpages);
    }
});
