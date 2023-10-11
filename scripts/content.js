function extractSubpagesUrls() {
    var links = document.querySelectorAll("a");
    var subPagesUrls = Array.from(links)
        .filter(function (link) { return link.href.startsWith(window.location.origin); })
        .map(function (link) { return link.href; });
    // send the subpage urls back to the extension
    alert(subPagesUrls[0]);
    chrome.runtime.sendMessage({ subPagesUrls: subPagesUrls });
}
