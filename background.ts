// listen for message request and return options
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === 'getOptions') {
      // simulate getting options
      const options = {
         scrollTimeStart: 10,
         scrollTimeEnd: 20,
         tabsMin: 1,
         tabsMax: 3,
         subpagesMin: 1,
         subpagesMax: 5,
      };
      sendResponse({ options });
   }
   if (request.action === 'closeTab') {
      alert(`closing tab with id: ${sender.tab?.id}`);
      chrome.tabs.remove(sender.tab?.id!);
   }
});

chrome.runtime.onMessage.addListener((message, sender) => {
   if (sender.tab && message.subpageUrls) {
      const subpages = message.subpagesUrls;
      alert("recieved: "+subpages);
   } else {
      alert("nothon");
   }
})