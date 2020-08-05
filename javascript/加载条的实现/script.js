const water = document.getElementById("water");

const load = document.getElementById("load");

load.addEventListener("click", (event) => {
  loading();
});

const loading = () => {
  let rateOfProgress = 0;
  
  let interval = setInterval(() => {
    water.style.width = `${rateOfProgress}%`;
    rateOfProgress++;
    if ( rateOfProgress > 100 ) {
        clearInterval(interval);
    }
  }, 100);
};
