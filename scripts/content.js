// perform scrolling
function scrollPage(options) {
    var scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
    var maxScrollHeight = document.body.scrollHeight - window.innerHeight; // Calculate the maximum scroll height

    var scrollStep = Math.floor(maxScrollHeight / (scrollTime * 100)); // Calculate the scroll step based on the time
    var currentScroll = 0;
    var canOpenSubPage = true;

    var interval = setInterval(function () {
        window.scrollBy(0, scrollStep);
        currentScroll += scrollStep;
        
        if (currentScroll >= maxScrollHeight / 2 && canOpenSubPage) { 
            visitSubPages(options);
            canOpenSubPage = false;
        }
        // Check if we've reached the maximum scroll height
        if (currentScroll >= maxScrollHeight) {
            clearInterval(interval);
            visitSubPages(options);
        }
    }); 
}

function visitSubPages(options) {
    var subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

    const subpages = extractSubpagesUrls();
    for (var index = 0; index < subpagesToVisit; index++){
        const randomSubpageIndex = Math.floor(Math.random() * subpages.length);
        const subpageUrl = subpages[ randomSubpageIndex ];
        setTimeout(async function () {
            await chrome.runtime.sendMessage({action: "openSubPage", url: subpageUrl, options: options})
        }, index * 5000);
        setTimeout(function () {
            closeTab();
        }, subpagesToVisit * 5000);
    }
    
}

function closeTab() {
    chrome.runtime.sendMessage({action: "closeTab"});
}
function extractSubpagesUrls() {
    var links = document.querySelectorAll("a");
    var subPagesUrls = Array.from(links)
        .filter((link) => link.href.startsWith(window.location.origin))
        .map((link) => link.href)
    // send the subpage urls back to the extension
    return subPagesUrls;
}

/**
 * Starts executing auto scrolling
 * @param {*} options options to start enable execution
 */
function executeAction(options) {
    if (options.scrollTimeStart && options.scrollTimeEnd) {
        scrollPage(options);
    }
    else if (options.tabsMin && options.tabsMax) {
        visitSubPages(options);
    }
}



chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === 'scroll') {
        executeAction(message.options);
    }
});