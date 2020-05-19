# HTML and CSS Question

Ziqi

---

## HTML 语义化标签(Sementic tags)是什么，为什么需要？
1. 交给浏览器解析并显示给用户。
2. 给搜索引擎提供方便。

## 引入CSS的方法有哪些？link和imort有哪些区别？
1. HTML文档嵌入式使用style标签。
```html
<style type="text/css">

</style>
```
2. HTML标签内部使用style属性。
```html
<span style="color:blue">超酷的互联网</span>
```
3. 外部式。
index.html
```HTML
<head>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
```

style.css
```CSS
span{
    color: red;
    font-size: 20px;
}
```

或者使用import.
```html
<style>
    @import style.css
</style>

```

**import和link的区别**

1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS.
2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。所以会出现一开始没有css样式，闪烁一下出现样式后的页面(网速慢的情况下).


## 伪类是什么？什么时候会用到？
CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

## 伪元素是什么？什么时候会用到？
例子：首字下沉，首行缩进
```css
p: first-letter{
    color: #ff0000;
    font-size: xx-large;
}
```

## 把竖着排列的元素变横有哪些方法？
1. div是块状元素，默认按列排，使用
```css
div {
    width: 200px;
    float: left;
}
```
让其元素从左到右排，应该需要规定一个宽度。

2. display: flex; justify-content


## 让一个元素左对⻬、右对⻬有哪些方法？
1. text-align: left
2. left: 0
3. float: left | right

## 让一个元素水平居中、垂直居中有哪些方法？
1. 对于块状元素，相对定位，绝对定位配合使用。子容器使用margin.
2. 使用margin: auto
3. text-align

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <style type="text/css">
            .container {
                border: 1px solid black;
            }
            .center {
                margin: auto;
                width: 50%;
                border: 3px solid green;
                padding: 10px;

                text-align: center;
            }
            .vertical {
                padding: 70px 0;
                border: 1px solid red;
                text-align: center;
            }
            .vertical2 {
                line-height: 200px;
                height: 200px;
                border: 3px solid green;
                text-align: center;
            }
            .vertical2 p {
                line-height: 1.5;
                display: inline-block;
                vertical-align: middle;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="center">
                div 元素水平居中
            </div>
        </div>
        
        <div class="container">
            <div class="vertical">
                div 元素垂直居中
            </div>
        </div>

        <div class="container">
            <div class="vertical2">
                div 元素垂直居中
            </div>
        </div>

        <div class="container">
            <div class="vertical2">
                <p>
                    第一行第一行第一行第一行第一行第一行第一行第一行第一行第一行
                </p>
            </div>
        </div>

    </body>
</html>


```
4. 垂直居中 - 使用 position 和 transform
```css
.center { 
    height: 200px;
    position: relative;
    border: 3px solid green; 
}
 
.center p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```


## 哪些CSS属性会继承？那些不会？
https://www.w3.org/TR/CSS21/propidx.html

https://www.jianshu.com/p/34044e3c9317

例如：
1. 可以继承

\<p>标签的颜色属性，其内部的\<span>标签\<em>标签可以继承。

2. 不可以继承
    1. 宽度
    2. 定位布局


## css的尺寸单位有哪些，每个的应用场景是什么？
1. px. pixel.

2. em: 当前元素的font-size = 1em.

3. %: 当前元素字体的百分比，屏幕的百分比。

## 如何做一个底栏能够一直在底部的(sticky-footer)?
```html
<html>
    <head>
        <meta charset="UTF-8">
        <style type="text/css">
            #footbar {
                position: fixed;
                bottom: 10px;
                right: 50%;
                
                border: 3px solid #73AD21;
            }
        </style>
    </head>

    <body>
        <footer id="footbar">
            I am footer part.
        </footer>
    </body>
</html>
```


## media-query是什么？有什么用？
@meida
made it possible to define different style rules for different media types.


## line-height有什么用？跟height有什么区别？
```html
<html>
    <head>
        <meta charset="UTF-8">
        <style type="text/css">
            div {
                height: 100px;
                width: 200px;
                border: 3px solid black;
            }

            p {
                font-size: 20px;
                line-height: 40px;
            }
        </style>
    </head>

    <body>
        <div>
            <p>
                hellooooooooooooooooooooooooooooooooooooo <br />
                hellooooooooooooooooooooooooooooooooooooo <br />
            </p>
        </div>
    </body>
</html>
```


## display都有哪些属性？使用场景分别是什么？
display: none | inline | block | inline-block | flex


## position都有哪些属性？使用场景分别是什么？
position: relative | absolute | fixed


## css中，百分比的使用，是谁的百分比？
这个百分比是一个相对值，取决于具体情况。
比如：
1. 相对于屏幕。
2. 相对于父容器。
3. 相对于当前元素。
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <style type="text/css">
            .screen {
                width: 70%;
                border: 1px solid black;
            }
            .container {
                width: 500px;
                height: 500px;
                border: 1px solid black;
            }
            .cube {
                width: 50%;
                height: 70%;
                border: 1px solid red;
            }
            p {
                font-size: 12px;
                line-height: 300%;
            }
        </style>
    </head>

    <body>
        <div class="screen">
            相对于整个屏幕的百分比
        </div>

        <div class="container">
            父容器
            <div class="cube">
                子容器
            </div>
        </div>
        <div>
            <p>
                行高百分比 <br />
                行高百分比 <br />
                行高百分比 <br />
            </p>
        </div>

    </body>
</html>
```


## html中的\<meta name="viewport">标签有什么用？
Setting the viewport to make your website look good on all devices:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

The **width=device-width** part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).

The **initial-scale=1.0** part sets the initial zoom level when the page is first loaded by the browser.

## Js有哪些引入方法？放在head里面跟body里面有什么区别？放在body的开头跟结尾有什么区别？

