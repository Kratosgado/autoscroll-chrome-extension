var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
            alert("activating");
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["../scripts/content.js"],
                // func: executeAction,
                // args: [tab, options]
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
        return __awaiter(this, void 0, void 0, function () {
            var subpagesToVisit, _loop_1, index;
            return __generator(this, function (_a) {
                subpagesToVisit = Math.floor(Math.random() * (options.subpagesMax - options.subpagesMin + 1)) + options.subpagesMin;
                _loop_1 = function (index) {
                    // const subpageUrl = (await getSubpagesUrl(tab.url!))[index];
                    var subpageUrl = "google.com";
                    setTimeout(function () {
                        chrome.tabs.create({ url: subpageUrl });
                    }, index * 5000);
                    setTimeout(function () {
                        closeTab(tab.id);
                    }, subpagesToVisit * 5000);
                };
                for (index = 0; index < subpagesToVisit; index++) {
                    _loop_1(index);
                }
                return [2 /*return*/];
            });
        });
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
