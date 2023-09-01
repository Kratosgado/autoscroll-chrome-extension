document.getElementById('startScroll').addEventListener('click', function () {
   const scrollTimeStart = parseInt(document.getElementById('scrollTimeStart').value, 10);
   const scrollTimeEnd = parseInt(document.getElementById('scrollTimeEnd').value, 10);
   const tabsMin = parseInt(document.getElementById('tabsMin').value, 10);
   const tabsMax = parseInt(document.getElementById('tabsMax').value, 10);
   const subpagesMin = parseInt(document.getElementById('subpagesMin').value, 10);
   const subpagesMax = parseInt(document.getElementById('subpagesMax').value, 10);

   const options = {
      scrollTimeStart,
      scrollTimeEnd,
      tabsMin,
      tabsMax,
      subpagesMin,
      subpagesMax,
   };

   chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setOptions,
      args: [ options ]
   });
});