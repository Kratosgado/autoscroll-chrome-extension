
document.addEventListener("DOMContentLoaded", function () {
    // select the button element by its Id
    var scrollButton = document.getElementById('startScroll');
    scrollButton.addEventListener('click', function () {
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
                args: [options],
                func: (options) => {       
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

                    executeAction(options);
                }
            })
        });
    });
    
});
