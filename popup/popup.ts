interface ScrollArgs {
   scrollTimeStart: number;
   scrollTimeEnd: number;
   tabsMin: number;
   tabsMax: number;
   subpagesMin: number;
   subpagesMax: number;
}
 
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

      const options: ScrollArgs = {
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
            // files: ['../scripts/content.js'],
            func: scrollPage,
            args: [options]
         })
      })
   });
   
// perform scrolling
   function scrollPage(options: ScrollArgs) {
      alert('scroll');
      const scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
      const scrollInterval = 100;
      const scrollStep = 1;
      const maxScrollAttempts = scrollTime * 1000/ scrollInterval;
      let scrollAttempts = 0;

      const interval = setInterval(() => {
         window.scrollBy(0, scrollStep);
         scrollAttempts++;

         if (scrollAttempts >= maxScrollAttempts) {
            clearInterval(interval);
            visitSubPages(options);
         }
      })
   }

   function visitSubPages(options: ScrollArgs) {
      const subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

      for (let index = 0; index < subpagesToVisit; index++) {
         const subpageUrl = `${window.location.origin}/subpage${index}.html`;
         setTimeout(() => {
            window.open(subpageUrl, '_blank');
         }, index * 1000);

         setTimeout(() => {
            clostTab();
         }, subpagesToVisit * 1000);
         
      }
   }

   function executeAction(options: ScrollArgs) {
      if (options.scrollTimeStart && options.scrollTimeEnd) {
         scrollPage(options);
      } else if (options.tabsMin && options.tabsMax) {
         visitSubPages(options);
      }
   }

   function clostTab(){
      chrome.runtime.sendMessage({ action: 'closeTab' });
   }
// open
});

