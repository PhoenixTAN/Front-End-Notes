# Javascript Tricks

## 一个事件只响应一次
```javascript
document.addEventListener("click", function onClickDocument(event) {
    clearSearchPopup(event);
    document.removeEventListener("click", onClickDocument);
}) ;

```

## innerHTML vs innerText
```html
<p id="demo">   This element has extra spacing     and contains <span>a span element</span>.</p>

<script>
function getInnerText() {
    alert(document.getElementById("demo").innerText)
}

function getHTML() {
    alert(document.getElementById("demo").innerHTML)
}

function getTextContent() {
    alert(document.getElementById("demo").textContent)
}
</script>
```
innerText returns: "This element has extra spacing and contains a span element."

innerHTML returns: "   This element has extra spacing     and contains <span>a span element</span>."

textContent returns: "   This element has extra spacing    and contains a span element."

The innerText property returns **just the text**, without spacing and inner element tags.

The innerHTML property returns the text, including all spacing and inner element tags.

The textContent property returns the text with spacing, but without inner element tags.

## Javascript设置class
**Element.className**
```javascript
var cName = elementNodeReference.className;
elementNodeReference.className = cName;
```
cName is a string variable representing the class or space-separated classes of the current element.

