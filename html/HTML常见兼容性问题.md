# html常见兼容性问题？

1. 浏览器默认的margin和padding不同
解决方案：加一个全局的 *{margin:0;padding:0;} 来统一。

2. 9. 怪异模式问题：漏写 DTD 声明，Firefox 仍然会按照标准模式来解析网页，但在 IE 中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写 DTD 声明的好习惯。现在可以使用[html5](http://www.w3.org/TR/html5/single-page.html) 推荐的写法：\<!DOCTYPE html>
