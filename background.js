chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.ts'],
    });
});
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
});
// chrome.action.onClicked.addListener((tab) => {
//    chrome.scripting.executeScript({
//      target: {tabId: tab.id},
//      function: openPopup
//    });
//  });
//  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    if (request.action === 'getOptions') {
//      // Simulate getting options (replace with your own logic)
//      const options = {
//        scrollTimeStart: 10,
//        scrollTimeEnd: 20,
//        tabsMin: 1,
//        tabsMax: 3,
//        subpagesMin: 1,
//        subpagesMax: 5,
//      };
//      sendResponse({ options });
//    }
//  });
