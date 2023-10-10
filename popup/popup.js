document.addEventListener("DOMContentLoaded", function () {
    // select the button element by its Id
    var scrollButton = document.getElementById('startScroll');
    scrollButton === null || scrollButton === void 0 ? void 0 : scrollButton.addEventListener('click', function () {
        // get values from input fields
        var scrollTimeStart = parseInt(document.getElementById("scrollTimeStart").value, 10);
        var scrollTimeEnd = parseInt(document.getElementById('scrollTimeEnd').value, 10);
        var tabsMin = parseInt(document.getElementById('tabsMin').value, 10);
        var tabsMax = parseInt(document.getElementById('tabsMax').value, 10);
        var subpagesMin = parseInt(document.getElementById('subpagesMin').value, 10);
        var subpagesMax = parseInt(document.getElementById('subpagesMax').value, 10);
        var options = {
            scrollTimeStart: scrollTimeStart,
            scrollTimeEnd: scrollTimeEnd,
            tabsMin: tabsMin,
            tabsMax: tabsMax,
            subpagesMin: subpagesMin,
            subpagesMax: subpagesMax,
        };
        // execute the code with the options
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                // files: ['../scripts/content.js'],
                func: executeAction,
                args: [tab, options]
            });
        });
    });
    // perform scrolling
    function scrollPage(tab, options) {
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
                // closeTab(tab.id!);
                visitSubPages(tab, options);
            }
        });
    }
    function visitSubPages(tab, options) {
        var subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;
        var _loop_1 = function (index) {
            var subpageUrl = (getSubpagesUrl())[index];
            setTimeout(function () {
                chrome.tabs.create({ url: subpageUrl });
            }, index * 5000);
            setTimeout(function () {
                closeTab(tab.id);
            }, subpagesToVisit * 5000);
        };
        for (var index = 0; index < subpagesToVisit; index++) {
            _loop_1(index);
        }
    }
    function executeAction(tab, options) {
        if (options.scrollTimeStart && options.scrollTimeEnd) {
            scrollPage(tab, options);
        }
        else if (options.tabsMin && options.tabsMax) {
            visitSubPages(tab, options);
        }
    }
    function closeTab(tabId) {
        chrome.tabs.remove(tabId);
    }
    function getSubpagesUrl() {
        // Get all of the links on the page.
        var links = document.querySelectorAll("a");
        // Create an array to store the subpage URLs.
        var subpagesUrl = [];
        // Iterate through the links and filter out the subpages.
        links.forEach(function (link) {
            if (link.href.startsWith(window.location.origin)) {
                subpagesUrl.push(link.href);
            }
        });
        // Return the URLs of the subpages.
        return subpagesUrl;
    }
    // open
});
