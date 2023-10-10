// interface ScrollArgs {
//    scrollTimeStart: number;
//    scrollTimeEnd: number;
//    tabsMin: number;
//    tabsMax: number;
//    subpagesMin: number;
//    subpagesMax: number;
// }
// // perform scrolling
//  function scrollPage(options: ScrollArgs) {
//    const scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
//    const scrollInterval = 100;
//    const scrollStep = 5;
//    const maxScrollAttempts = 1000;
//    let scrollAttempts = 0;

//    const interval = setInterval(() => {
//       window.scrollBy(0, scrollStep);
//       scrollAttempts++;
//       // scroll till the end of the page
//       // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//       //    clearInterval(interval);
//       //    // close tab after scrolling
//       //    visitSubPages(options);
//       //    await clostTab();
//       //    return void 0;
//       // } 

//       if (scrollAttempts >= maxScrollAttempts) {
//          clearInterval(interval);
//          window.close();
//          visitSubPages(options);
//       }
//    })
// }

// function visitSubPages(options: ScrollArgs) {
//    const subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

//    for (let index = 0; index < subpagesToVisit; index++) {
//       const subpageUrl = `${window.location.origin}/subpage${index}.html`;
//       setTimeout(() => {
//          window.open(subpageUrl, '_blank');
//       }, index * 1000);

//       setTimeout(() => {
//          clostTab();
//       }, subpagesToVisit * 1000);
      
//    }
// }

// function executeAction(options: ScrollArgs) {
//    if (options.scrollTimeStart && options.scrollTimeEnd) {
//       scrollPage(options);
//    } else if (options.tabsMin && options.tabsMax) {
//       visitSubPages(options);
//    }
// }

//  function clostTab(){
//    chrome.runtime.sendMessage({ action: 'closeTab' });

// }