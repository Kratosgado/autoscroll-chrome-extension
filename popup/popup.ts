document.addEventListener("DOMContentLoaded", () => {
   // select the button element by its Id
   const scrollButton = document.getElementById('startScroll');

   scrollButton?.addEventListener('click', () => {
      // get values from input fields
      const scrollTimeStart = parseInt((document.getElementById("scrollTimeStart") as HTMLInputElement).value, 10);
      const scrollTimeEnd = parseInt((document.getElementById('scrollTimeEnd') as HTMLInputElement).value, 10);
      const tabsMin = parseInt((document.getElementById('tabsMin')as HTMLInputElement).value, 10);
      const tabsMax = parseInt((document.getElementById('tabsMax')as HTMLInputElement).value, 10);
      const subpagesMin = parseInt((document.getElementById('subpagesMin')as HTMLInputElement).value, 10);
      const subpagesMax = parseInt((document.getElementById('subpagesMax')as HTMLInputElement).value, 10);

      const options = {
         scrollTimeStart,
         scrollTimeEnd,
         tabsMin,
         tabsMax,
         subpagesMin,
         subpagesMax,
      }

      // execute the code with the options
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
         const tab = tabs[0];
         chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: (options) => {
               // logic
               alert(options);
            },
            args: [options]
         })
      })
   });
});

// function logConsole() {
//    console.log('clicked');
// }