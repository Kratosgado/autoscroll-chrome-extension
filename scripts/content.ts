
function extractSubpagesUrls() {
   const links = document.querySelectorAll("a");

   alert(links.length);
   const subPagesUrls = Array.from(links)
      .filter(link => link.href.startsWith(window.location.origin))
      .map(link => link.href);
   
   // send the subpage urls back to the extension

   alert("sending subpages: "+ subPagesUrls);
   chrome.runtime.sendMessage({ subPagesUrls });
}

extractSubpagesUrls();