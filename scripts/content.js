var options = {
    scrollTimeStart: 10,
    scrollTimeEnd: 20,
    tabsMin: 1,
    tabsMax: 3,
    subpagesMin: 1,
    subpagesMax: 5,
};
// perform scrolling
function scrollPage(options) {
    var scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
    var scrollInterval = 100;
    var scrollStep = 1;
    var maxScrollAttempts = 1000;
    var scrollAttempts = 0;
    var interval = setInterval(function () {
        window.scrollBy(0, scrollStep);
        scrollAttempts++;
        if (scrollAttempts >= maxScrollAttempts) {
            clearInterval(interval);
            visitSubPages(options);
        }
    });
}
function visitSubPages(options) {
    var subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

    const subpages = extractSubpagesUrls();
    for (var index = 0; index < subpagesToVisit; index++){
        const subpageUrl = subpages[ index ];
        setTimeout(function () {
            window.open(subpageUrl, '_blank');
        }, index * 1000);
        setTimeout(function () {
            closeTab();
        }, subpagesToVisit * 5000);
    }
    
}
function executeAction(options) {
    if (options.scrollTimeStart && options.scrollTimeEnd) {
        scrollPage(options);
    }
    else if (options.tabsMin && options.tabsMax) {
        visitSubPages(options);
    }
}
function closeTab() {
    chrome.runtime.sendMessage("closeTab");
}
function extractSubpagesUrls() {
    var links = document.querySelectorAll("a");
    var subPagesUrls = Array.from(links)
        .filter((link) => link.href.startsWith(window.location.origin))
        .map((link) => link.href)
    // send the subpage urls back to the extension
    return subPagesUrls;
}