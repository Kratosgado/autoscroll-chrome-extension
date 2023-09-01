
chrome.action.onClicked.addListener((tab) => {
   chrome.scripting.executeScript({
      target:  {tabId: tab.id },
      function: openPopup
   })
})


chrome.scripting.registerServiceWorker({
   script: { src: 'backgroundServiceWorker.js' }
});