# iframe

The HTML Inline Frame element (\<iframe>) represents a nested browsing context, embedding another HTML page into the current one.


优点：
1. 解决加载缓慢的第三方内容如图标和广告等的加载问题
2. Security sandbox
3. 并行加载脚本

缺点：
1. iframe会阻塞主页面的Onload事件
2. 即时内容为空，加载也需要时间
3. 没有语意


Iframes 阻塞页面加载

及时触发 window 的 onload 事件是非常重要的。onload 事件触发使浏览器的 “忙” 指示器停止，告诉用户当前网页已经加载完毕。
