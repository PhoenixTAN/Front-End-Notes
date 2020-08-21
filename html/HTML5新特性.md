# HTML5 新特性

1. 语义化更好的内容标签（header,nav,footer,aside,article,section）
2. canvas, svg

3. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
4. sessionStorage 的数据在浏览器关闭后自动删除

## HTML 语义化标签(Sementic tags)是什么，为什么需要？

https://developer.mozilla.org/en-US/docs/Glossary/Semantics
1. 交给浏览器解析并显示给用户。
    accessibility 阅读模式 盲人模式 产品面向什么人群

    Web Accessibility (A11Y) refers to best practices for keeping a website usable despite physical and technical restrictions.
2. 给搜索引擎提供方便。

具体有哪些？
```html
<article>
<aside>
<details>
<figcaption>
<figure>
<footer>
<header>
<main>
<mark>
<nav>
<section>
<summary>
<time>
```

### \<article>
The HTML \<article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). 

Examples include: 
- a forum post, 
- a magazine or newspaper article, 
- or a blog entry.

### \<aside>
The HTML <aside> element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.

