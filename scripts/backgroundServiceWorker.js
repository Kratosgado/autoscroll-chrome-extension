// chrome.action.onClicked.addListener((tab) => {
//    chrome.scripting.executeScript({
//       target:  {tabId: tab.id },
//       function: openPopup
//    })
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === 'setOptions') {
      // store the options in the service worker
      this.options = request.options;
   }
});