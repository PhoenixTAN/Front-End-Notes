document.cookie = "Some information in cookie";

const scriptInjection = document.getElementById("scriptInjection");
const button = document.getElementById("submitButton");

button.addEventListener("click", (event) => {
    const text = scriptInjection.value;
    console.log("hello", text);
    const div = document.createElement('div');
    div.innerHTML = text;
    document.body.appendChild(div);
});

// <script type="text/javascript" src="script2.js"> alert("请认真听讲！！"); </script>
