// get the options from the service worker

const options = await chrome.runtime.sendMessage({ action: 'getOptions' });

// Communicate with the background service worker to get options
async function getOptions() {
   return new Promise((resolve) => {
     chrome.runtime.sendMessage({ action: 'getOptions' }, (response) => {
       resolve(response.options);
     });
   });
 }
 
 // Perform scrolling
 async function scrollPage(scrollTime) {
   const scrollInterval = 100; // Adjust this value as needed
   const scrollStep = 5; // Adjust this value as needed
   const maxScrollAttempts = scrollTime * 1000 / scrollInterval;
   let scrollAttempts = 0;
 
   const interval = setInterval(() => {
     window.scrollBy(0, scrollStep);
     scrollAttempts++;
 
     if (scrollAttempts >= maxScrollAttempts) {
       clearInterval(interval);
       visitSubpages();
     }
   }, scrollInterval);
 }
 
 // Visit subpages
 async function visitSubpages() {
   const options = await getOptions();
   const subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;
 
   for (let i = 0; i < subpagesToVisit; i++) {
     const subpageUrl = `${window.location.origin}/subpage${i}.html`;
     setTimeout(() => {
       window.open(subpageUrl, '_blank');
     }, i * 1000); // Visit each subpage after a delay
   }
 
   setTimeout(() => {
     closeTab();
   }, subpagesToVisit * 1000); // Close the tab after visiting all subpages
 }
 
 // Open subpages in the current tab
 async function openSubpages() {
   const options = await getOptions();
   const subpagesToOpen = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;
 
   for (let i = 0; i < subpagesToOpen; i++) {
     const subpageUrl = `${window.location.origin}/subpage${i}.html`;
     setTimeout(() => {
       window.open(subpageUrl, '_blank');
     }, i * 1000); // Open each subpage after a delay
   }
 }
 
 // Execute the appropriate action based on options
 async function executeAction() {
   const options = await getOptions();
 
   if (options.scrollTimeStart && options.scrollTimeEnd) {
     const scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
     scrollPage(scrollTime);
   } else if (options.tabsMin && options.tabsMax) {
     openSubpages();
   }
 }
 
 // Call the executeAction function to start the desired action
 executeAction();
 


await chrome.runtime.sendMessage({ action: 'closeTab' });