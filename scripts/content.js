function scroll() {
   // define scrolling interval (in milliseconds)
   const scrollInterval = 100;
   const scrollStep = 5;
   const maxScrollAttempts = 300;

   let scrollAttempts = 0;

   const interval = setInterval(() => {
      window.scrollBy(0, scrollStep);
      scrollAttempts++;

      if (scrollAttempts >= maxScrollAttempts) {
         clearInterval(interval)
         window.close();
      }
   }, scrollInterval);
}

scroll();