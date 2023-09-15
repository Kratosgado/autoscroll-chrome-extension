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
        alert(scrollTimeEnd);
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
                func: function (options) {
                    // logic
                    alert(options);
                },
                args: [options]
            });
        });
    });
});
// function logConsole() {
//    console.log('clicked');
// }
