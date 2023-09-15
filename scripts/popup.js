
// Add an event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  // Select the button element by its ID
  const scrollButton = document.getElementById('startScroll');

  // Check if the button exists
  if (scrollButton !== null) {
    // Add a click event listener to the button
    scrollButton.addEventListener('click', function () {
      // Get values from input fields
      const scrollTimeStart = parseInt(document.getElementById('scrollTimeStart').value, 10);
      const scrollTimeEnd = parseInt(document.getElementById('scrollTimeEnd').value, 10);
      const tabsMin = parseInt(document.getElementById('tabsMin').value, 10);
      const tabsMax = parseInt(document.getElementById('tabsMax').value, 10);
      const subpagesMin = parseInt(document.getElementById('subpagesMin').value, 10);
      const subpagesMax = parseInt(document.getElementById('subpagesMax').value, 10);

      // Define the options object
      const options = {
        scrollTimeStart,
        scrollTimeEnd,
        tabsMin,
        tabsMax,
        subpagesMin,
        subpagesMax,
      };

      // Execute the code with the options
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: function (options) {
            // Your code here, you can access 'options' inside this function
            console.log(options);
          },
          args: [options],
        });
      });
    });
  } else {
    // If the button does not exist, set the background color to red
    document.body.style.backgroundColor = 'red';
  }
});
