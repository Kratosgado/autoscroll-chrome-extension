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
                func: scrollPage,
                args: [options]
            });
        });
    });
    // perform scrolling
    function scrollPage(options) {
        alert('scroll');
        var scrollTime = Math.floor(Math.random() * (options.scrollTimeEnd - options.scrollTimeStart + 1)) + options.scrollTimeStart;
        var scrollInterval = 100;
        var scrollStep = 5;
        var maxScrollAttempts = scrollTime * 1000 / scrollStep;
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
    // open
});
