# Report

Ziqi Tan

## System Features
1. 监测用户点击。
    - 客户端类型（Web/Android/IOS）
    - 事件类型（浏览/点击）
    - 时间
    - 地点
    - 客户端IP
    - User Agent
    - userId
2. 可以自定义监测元素。
3. 浏览路径分析（下文都将称为事件链）。
4. 页面停留时间（进入页面，离开页面）。
5. 页面曝光（如果某个页面可以滚动，需要记录用户在哪里浏览了多久）。
6. 生成页面点击的热力图。


点了哪里，看了什么，看了多长时间

## 技术方案

### 前端
1. 使用react-tracking埋点

2. 数据记录
```json
{
    "user_id": "unique_user_id",  // 已经登录的使用userId, 没有登录的使用设备id，cookie
    "happenedAt":  "1434556935000", // 事件发生时间

    "event_id": "unique_user_id+1434556935000", // 用户的uid串联发生时间
    "windowNavigator": ""
    "properties": {
        "type": "ViewPage",     // view menu, add item to cart, view
        "last_event_id":  "unique_user_id+1434556922000", // 上一个事件的id，用于追踪

        "city":"NYC",   // 网站需要弹窗给用户请求
		"state": "NY",

		"ip": "180.79.35.65",   // 能否获取
        "url": "m.pinon.io/junzi",
        "referrer": "d.pinon.io",
		"user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
    }
}
```

**写一个type assertion**
```typescript
Event:
{
    "action": string,
    "happenedAt": string,   // 事件发生时间
    "pathname": string,
    "userAgent": string,
    "geoLocation": {},
    "property": {
        "property1": string,
        "property2": string,
        ...
    }
}
```

```typescript
EventChain:
{
    "sendTime": string
    "userAgent": string,
    "geolocation": {},
    "events": [
            event1, 
            event2,
            event3,
            ...
        ]
}
```



如果是游客登录，一直用no-touch menu呢

"click--dine-in"

如果是曝光类事件，怎么存last_event_id

experimentalDecorators

The return type of a property decorator function must be either 'void' or 'any'.

3. 前端数据发送
```javascript
// npm react-tracking
const TrackedApp = track(
  { app: "my-app" },

  {
    dispatch: data => {
      console.log(data);
      
      new Image().src = `./haorooms.gif?${happenedAt}=${data}&${Math.random()}`;
      // 这个用Axios还是gif
      
      (window.dataLayer = window.dataLayer || []).push(data);   // 用于事件链的发送
    }
  }
)(App);
```

4. 事件链的发送与存储

    以下情况，需要将window.dataLayer的所有数据，一次性发到后台，到此，就算是一个事件链的结尾。将

    1. 如果跳转到其他url，例如从d.pinon.io跳到了google; didUnmount
    2. 如果手机退出了浏览器，苹果上滑动清除后台程序; visibility change
    3. 如果页面跑崩了; react error boundary
    4. 如果手机切出了浏览器; visibility change
    5. 用户logout;


为什么由前端记录事件链？

理论上，只要所有事件都有时间戳和用户id，就能从数据库把这些都读出来，然后再根据每条记录的last_event_id属性，将事件串联成事件链。但是这样的查询的开销较大。

前端完整记录整个事件链即可（看下面代码properties里面的chain属性），但是这样做会有大量的数据冗余。

```json
{
    "user_id": "unique_user_id",  // 已经登录的使用userId, 没有登录的使用设备id
    "happenedAt":  "1434556935000", // 事件发生时间

    "event_id": "unique_user_id+1434556935000", // 用户的uid串联发生时间
    "properties": {
        "type": "event_chain",     
        "chain": window.datalayer,  
        "last_event_id":  "unique_user_id+1434556922000", // 上一个事件的id，用于追踪
        "isLogin": true, 
        "city":"NYC",
		"state": "NY",
		"ip":"180.79.35.65",
        "url": "m.pinon.io/junzi",
        "referrer": "d.pinon.io",
		"user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
    }
}
```

## 后端


## 细节

### 事件类型分类
1. ViewHomePage 进入主页面，可以作为事件链的开头，如果直接进入其他页面，则以“浏览xx页面”作为事件链的开头。
2. ClickDeals, ViewDealsPage, ClickRestaurants, ViewRestaurants, ViewMenu, AddToCart, ViewCart, PlaceOrder, （待完善）
3. Click页面点击，由此生成的数据量较大，可以用于生成热力图。
4. LeavePage 离开页面，事件链的结尾。

### Intersection Observer API --- 不影响前端性能地记录页面曝光

Intersection Observer API提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API

一些页面或者餐厅或者弹窗或者食物被曝光的时候，就会调用callback，来发送一个事件，例如ViewMenu, ViewFood.


## TODO
1. 数据提取
2. 数据可视化
3. 数据分析

## 数据分析
我只写我了解到的一些指标，需要继续调研或者请专业人士。
1. 页面停留时间。
2. 页面曝光在哪里。
3. 页面浏览次数。
4. 页面浏览人数。
5. 热力图。

## 以下几个问题需要咱们的CTO看一看
1. 前端发送请求如何发？

    1. 拼多多使用gif
    ```html
    <button onClick="aa()">haorooms</button>
    <script>
        function aa(){
        new Image().src =`./haorooms.gif?${key}=${value}&${Math.random()} ` 
        }
    </script>
    ```

    2. 当然我们还是可以使用我们熟悉的Axios请求。

2. 前端记录事件链的方式和理由不知道是否合理。
3. 我还需要知道：我是做d.pinon.io和m.pinon.io的埋点吗？

## 参考
https://manual.sensorsdata.cn/sa/latest/tech_knowledge_model-1573771.html

https://codesandbox.io/s/reacttracking-example-qk30j4x1zj?file=/src/index.js:1463-1801


https://www.haorooms.com/post/css_data_up



## 目前所能够记录的动作


