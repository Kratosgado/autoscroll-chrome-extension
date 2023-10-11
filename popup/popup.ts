// import axios from "axios";
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
         alert("activating");
         chrome.scripting.executeScript({
            
            target: { tabId: tab.id! },
            files: ["../scripts/content.js"],
            // func: executeAction,
            // args: [tab, options]
         })
      })
   });
   
// perform scrolling
   function scrollPage(tab: chrome.tabs.Tab, options: ScrollArgs) {
      const scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
      const scrollInterval = 100;
      const scrollStep = 1;
      const maxScrollAttempts = 1000;
      let scrollAttempts = 0;

      const interval = setInterval(() => {
         window.scrollBy(0, scrollStep);
         scrollAttempts++;

         if (scrollAttempts >= maxScrollAttempts) {
            clearInterval(interval);
            // closeTab(tab.id!);
            visitSubPages(tab, options);
         }
      })
   }

   async function visitSubPages(tab: chrome.tabs.Tab, options: ScrollArgs) {
      const subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

      for (let index = 0; index < subpagesToVisit; index++) {
         // const subpageUrl = (await getSubpagesUrl(tab.url!))[index];
         const subpageUrl = "google.com";
         setTimeout(() => {
            chrome.tabs.create({url: subpageUrl});
         }, index * 5000);

         setTimeout(() => {
            closeTab(tab.id!);
         }, subpagesToVisit * 5000);
         
      }
   }

   function executeAction(tab: chrome.tabs.Tab, options: ScrollArgs) {
      if (options.scrollTimeStart && options.scrollTimeEnd) {
         scrollPage(tab, options);
      } else if (options.tabsMin && options.tabsMax) {
         visitSubPages(tab, options);
      }
   }

   function closeTab(tabId: number){
      chrome.tabs.remove(tabId);
   }

   // async function getSubpagesUrl(siteUrl: string): Promise<string[]> {
   //    alert(window.location.origin);
   //    alert(siteUrl);
   //    // const response = await axios.get(window.location.origin);
   //    const html = response.data;
   //    // Get all of the links on the page.
   //    const links:URL[] = html.querySelectorAll("a");

   //    // Filter out the links that are not subpages.
   //    const subpagesUrl = links.filter((link) => link.href.startsWith(siteUrl));

   //    // Return the URLs of the subpages.
   //    return subpagesUrl.map((link) => link.href);
   //  }
});