const sendRequest = (content) => {
  console.log(`Content: ${content}     ${new Date().toString()}`);
};

// 防抖前的输入
const inputContent = document.getElementById("userInput");
inputContent.addEventListener("keyup", (event) => {
  sendRequest(event.target.value);
});

// 防抖后的输入
const debounce = (handler, delay = 1000) => {
  let debounceTimer;
  return (content) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => handler(content), delay);
  };
}; 

const debounceRequest = debounce(sendRequest);

const debounceInput = document.getElementById("debounceInput");
debounceInput.addEventListener("keyup", (event) => {
  debounceRequest(event.target.value);
});

// 节流后的输入
const throttle = (handler, pause = 800) => {
  
  return (content) => {

  }
}

const throttleRequest = throttle(sendRequest);

const throttleInput = document.getElementById('throttleInput');
throttleInput.addEventListener("keyup", (event) => {
  throttleRequest(event.target.value);
});



