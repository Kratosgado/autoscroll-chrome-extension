import axios from "axios";

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
                // files: ["../scripts/content.js"],
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
    async function visitSubPages(tab, options) {
        var subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;

        for (var i = 0; i < subpagesToVisit; i++){
            const subpageUrl = (await getSubpagesUrl())[ index ];
            setTimeout(function () {
                chrome.tabs.create({ url: subpageUrl });
            }, index * 5000);
            setTimeout(function () {
                closeTab(tab.id);
            }, subpagesToVisit * 1000);
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
    function extractSubpagesUrls() {
        var links = document.querySelectorAll("a");
        var subPagesUrls = Array.from(links)
            .filter(function (link) { return link.href.startsWith(window.location.origin); })
            .map(function (link) { return link.href; });
        // send the subpage urls back to the extension
        alert(subPagesUrls[0]);
        return subPagesUrls;
    }
    async function getSubpagesUrl(siteUrl) {
       alert(window.location.origin);
       alert(siteUrl);
       const response = await axios.get(window.location.origin);
       const html = response.data;
       // Get all of the links on the page.
       const links = html.querySelectorAll("a");
       // Filter out the links that are not subpages.
       const subpagesUrl = links.filter((link) => link.href.startsWith(siteUrl));
        // Return the URLs of the subpages.
       return subpagesUrl.map((link) => link.href);
     }
});
