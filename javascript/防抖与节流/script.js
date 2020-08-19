// 模拟请求的发送
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
const throttle = (handler, pause = 1000) => {

  let isExecuted = false;
  return (content) => {
    // .......||.......||.......||.......||
    // 没设计时器，设计时器，执行计时器任务；没设计时器，设计时器，执行即使任务
    if(!isExecuted) {
      isExecuted = true;
      setTimeout(()=>{
        handler(content); 
        isExecuted = false;
      }, pause);
    }
  };
};

const throttleRequest = throttle(sendRequest);

const throttleInput = document.getElementById("throttleInput");
throttleInput.addEventListener("keyup", (event) => {
  throttleRequest(event.target.value);
});

window.addEventListener("scroll", (event) => {
  throttleRequest("scrolling...");
});
