// perform scrolling
function scrollPage(options) {
    var scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
    var scrollInterval = 100;
    var scrollStep = 5;
    var maxScrollAttempts = 1000;
    var scrollAttempts = 0;
    var interval = setInterval(function () {
        window.scrollBy(0, scrollStep);
        scrollAttempts++;
        // scroll till the end of the page
        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //    clearInterval(interval);
        //    // close tab after scrolling
        //    visitSubPages(options);
        //    await clostTab();
        //    return void 0;
        // }
        if (scrollAttempts >= maxScrollAttempts) {
            clearInterval(interval);
            window.close();
            visitSubPages(options);
        }
    });
}
function visitSubPages(options) {
    var subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;
    var _loop_1 = function (index) {
        var subpageUrl = "".concat(window.location.origin, "/subpage").concat(index, ".html");
        setTimeout(function () {
            window.open(subpageUrl, '_blank');
        }, index * 1000);
        setTimeout(function () {
            clostTab();
        }, subpagesToVisit * 1000);
    };
    for (var index = 0; index < subpagesToVisit; index++) {
        _loop_1(index);
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
function clostTab() {
    chrome.runtime.sendMessage({ action: 'closeTab' });
}
