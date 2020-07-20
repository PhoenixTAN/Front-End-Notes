const sendRequest = (content) => {
  console.log(`Request ${content} ${new Date().toString()}`);
};

// 防抖前的输入
const inputContent = document.getElementById("userInput");
inputContent.addEventListener("keyup", (event) => {
  sendRequest(event.target.value);
});

// 防抖后的输入
const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};  

const debounceAjax = debounce(sendRequest, 500);

const debounceInput = document.getElementById("debounceInput");
debounceInput.addEventListener("keyup", function (e) {
  debounceAjax(e.target.value);
});
