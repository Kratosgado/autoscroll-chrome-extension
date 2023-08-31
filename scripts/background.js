

chrome.action.onClicked.addListener(
   function (tab) {
      chrome.tabs.execute({
         file: 'content.js'
      })
   }
)