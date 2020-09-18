# Research 

## Drafts
http://www.webfunny.cn/website/home.html

TX怎么做？

pdd怎么做？

Google Analytics

https://analytics.google.com/analytics/web/#/p235374883/reports/home?params=_u..nav%3Dga1-experimental

https://developers.google.com/analytics/devguides/collection/analyticsjs


GrowingIO
https://www.growingio.com/

无埋点

手动埋点

普通的数据库行不行

https://juejin.im/post/6844904161566261256

### 美团文章
https://tech.meituan.com/2017/03/02/mt-mobile-analytics-practice.html

第一类是**代码埋点**，即在需要埋点的节点调用接口直接上传埋点数据，友盟、百度统计等第三方数据统计服务商大都采用这种方案；**TX pdd也是**;

第二类是**可视化埋点**，即通过可视化工具配置采集节点，在前端自动解析配置并上报埋点数据，从而实现所谓的“无痕埋点”， 代表方案是已经开源的**Mixpanel**；
https://github.com/mixpanel

由于代码埋点需要终端开发人员来执行采集方案，对业务的功能开发侵入性较高。有的公司开发出了可视化埋点技术，只需要产品与运营人员通过GUI界面进行鼠标简单点击，就可以随时增加、取消、调整采集数据的位置和方式，此种埋点方式避开了终端开发人员的介入，由需求人员直接执行采集，减轻了需求传递过程中的信息损耗和误解，另外可视化埋点技术往往由服务端直接下发采集的配置文件，而不用跟随版本发布，从而加快了数据采集的流程。

第三类是**无埋点**，它并不是真正的不需要埋点，而是前端自动采集全部事件并上报埋点数据，在后端数据计算时过滤出有用数据，代表方案是国内的**GrowingIO**。

公司原有埋点主要采用手动代码埋点的方案，代码埋点虽然使用起来灵活，但是开发成本较高，并且一旦上线就很难修改。如果发生严重的数据问题，我们只能通过发热修复解决。

如果直接改进为可视化埋点，开发成本较高，并且也不能解决所有埋点需求；

改进为无埋点的话，带来的流量消耗和数据计算成本也是业务不能接受的。因此，我们在原有代码埋点方案的基础上，演化出了一套轻量的、声明式的前端埋点方案，并且在动态埋点、无痕埋点等方向做了进一步的探索和实践。

## System Features
1. 监测用户点击。
    客户端类型（Web/Android/IOS）、事件类型（浏览/点击）、时间、地点、客户端IP和User Agent、userId
2. 自定义需要监测的元素。
3. 浏览路径分析。
4. 页面停留时间（进入页面，离开页面）。
5. 滑动。
6. 热力图？
7. 页面浏览次数。
8. 页面浏览人数。PV

## 现成解决方案

### Google Analytics

可满足前端需求

但是数据发送到 google-analytics.com/collect

## Github项目
https://github.com/ecomfe/react-track

## npm for React
- react-tracking：偏向于声明式，但使用HOC的形式限制了使用的场景，且通过拦截类方法而臧props来进行数据的采集，与React的数据流形式略有不和。

- react-tracker：采用类似react-redux的思想，使用connect和Provider的形式将功能联系起来。但是这种做法更偏向于命令式，从使用的角度来说繁琐之余也不易追踪。

## 问题
1. 数据要怎么存
2. 前端只管发数据
3. 这两个npm库，没有page view功能。


## Next move
查一下MixPanel

其他的库

数据要怎么存 前端怎么发 怎么记录这个事件

用什么数据库

Apache Cassandra

可视化埋点


## Time series database
简书文章
https://www.jianshu.com/p/31afb8492eff

DB engine数据库热度排名
https://db-engines.com/en/ranking

## InfluxDB
腾讯云的文章
https://cloud.tencent.com/developer/article/1422363

InfluxDB是一个上下游产业:
Telegraf(收集数据) —> InfluxDB(存储数据) —> Chronograf(显示数据) —>Kapacitor(处理数据)  

优势：
1. 数据库增删查改类似sql.
2. 有node.js的库支持。
3. 不一定要安装相应上下游软件。

https://node-influx.github.io/class/src/index.js~InfluxDB.html

https://www.npmjs.com/package/influx

是否支持我存储字典类型？
https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_reference/


## 前端如何记录数据
https://greenstick.github.io/interactor/

https://stackoverflow.com/questions/18774715/tracking-user-interaction-on-a-website

### gif打点
https://www.haorooms.com/post/css_data_up

```html
<button onClick="aa()">haorooms</button>
<script>
    function aa() {
        new Image().src = `./haorooms.gif?${key}=${value}&${Math.random()} `
    }
</script>
```
对于整个事件链，可以先存在window/sessionStorage/localStorage里面，然后在这个window关闭时发送或者定时发送。

### 发什么
1. 一方面看我们自身的需求。
2. 另一方面看怎么定义合理，方便存储与后续的数据分析。

看看神策数据是怎么定义的？
https://manual.sensorsdata.cn/sa/latest/tech_knowledge_model-1573771.html


```json
{
	"distinct_id": "2b0a6f51a3cd6775",
	"time": 1434556935000,
	"type": "track",
	"event": "PageView",
	"properties": { 
		"$ip" : "180.79.35.65",
		"user_agent" : "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.）",
		"page_name" : "网站首页",
		"url" : "www.demo.com",
		"referer" : "www.referer.com"
	} 
}
```

```json
{
	"distinct_id": "123456",
	"time": 1434556935000,
	"type": "track",
	"event": "ViewProduct",
	"project": "ebiz_test",
	"time_free": true, //建议在导入历史数据时使用，SDK 采集的实时数据不建议使用
	"properties": {
		"$is_login_id":true, //此参数请慎重使用，详细介绍请参考文档底部 8.1 $is_login_id 参数说明
		"$app_version":"1.3",
		"$wifi":true,
		"$ip":"180.79.35.65",
		"$province":"湖南",
		"$city":"长沙",
		"$user_agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
		"$screen_width":320,
		"$screen_height":568,
		"product_id":12345,
		"product_name":"苹果",
		"product_classify":"水果",
		"product_price":14.0
	}
}
```


易观方舟
https://analysys.gitbook.io/ark/integration/prepare/tracking-plan

事件模板：
1. 事件ID: PayOrder
2. 事件名称: 支付订单
3. 事件说明: 点击支付按钮时触发
4. 属性ID: paymentMethod
5. 属性名称: 支付方式
6. 属性说明
7. 属性值类型:字符型


## 理论
在神策分析中，我们使用事件模型（Event 模型）来描述用户在产品上的各种行为，这也是神策分析所有的接口和功能设计的核心依据。

简单来说，事件模型包括**事件（Event）和用户（User）两个核心实体**，同时配合物品（Item）实体可以做各种维度分析，在神策分析中，分别提供了接口供使用者上传和修改这两类相应的数据，在使用产品的各个功能时，这两类数据也可以分别或者贯通起来参与具体的分析和查询。对这两个概念，我们会在后文做具体的描述。

### Event Model Vs. Page View
在传统的 Web 时代，通常使用 PV（Page View 的简写，也即页面访问量）来衡量和分析一个产品的好坏，然后，到了移动互联网以及 O2O 电商时代，PV 已经远远不能满足产品和运营人员的分析需求了。

在这个年代，每个产品都有着独一无二的核心指标用来衡量产品是否成功，这个指标可能是发帖数量、视频播放数量、订单量或者其它的可以体现产品核心价值的指标，这些都是一个简单的 PV 无法衡量的。

除此之外，PV 模型也无法满足一些更加细节的、更加精细化的分析。例如，我们想分析哪类产品销量最好，访问网站的用户的年龄和性别构成，每个渠道过来的用户的转化率、留存和重复购买率分别如何，新老用户的客单价、流水、补贴比例分别是多少等等。这些问题，都是以 PV 为核心的传统统计分析没办法解答的问题。

因此，神策分析采用事件模型作为基本的数据模型。事件模型可以给我们更多的信息，让我们知道用户用我们的产品具体做了什么事情。事件模型给予我们更全面且更具体的视野，指导我们做出更好的决策。

当然，采用神策分析的事件模型，依然是可以完成 PV 统计的，并且实现起来也很简单，使用 SDK 或者导入工具上传一个类似的接口即可

```json
{
	"distinct_id": "2b0a6f51a3cd6775",
	"time": 1434556935000,
	"type": "track",
	"event": "PageView",
	"properties": { 
		"$ip" : "180.79.35.65",
		"user_agent" : "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.）",
		"page_name" : "网站首页",
		"url" : "www.demo.com",
		"referer" : "www.referer.com"
	} 
}
```

### Event 实体

#### Event 的五要素
简单来说，一个 Event 就是描述了：**一个用户在某个时间点、某个地方，以某种方式完成了某个具体的事情**。从这可以看出，一个完整的 Event，包含如下的几个关键因素：

1. Who：即参与这个事件的用户是谁。在我们的数据接口中，使用 distinct_id 来设置用户的唯一 ID：对于未登录用户，这个 ID 可以是 cookie_id、设备 ID 等匿名 ID；对于登录用户，则建议使用后台分配的实际用户 ID。同时，我们也提供了 track_signup 这个接口，在用户注册的时候调用，用来将同一个用户注册之前的匿名 ID 和注册之后的实际 ID 贯通起来进行分析。
2. When：即这个事件发生的实际时间。在我们的数据接口中，使用 time 字段来记录精确到毫秒的事件发生时间。如果调用者不主动设置，则各个 SDK 会自动获取当前时间作为 time 字段的取值。
3. Where：即事件发生的地点。使用者可以设置 properties 中的 $ip 属性，这样系统会自动根据 ip 来解析相应的省份和城市，当然，使用者也可以根据应用的 GPS 定位结果，或者其它方式来获取地理位置信息，然后手动设置 $city 和 $province。除了 $city 和 $province 这两个预置字段以外，也可以自己设置一些其它地域相关的字段。例如，某个从事社区 O2O 的产品，可能需要关心每个小区的情况，则可以添加自定义字段 “HousingEstate”；或者某个从事跨国业务的产品，需要关心不同国家的情况，则可以添加自定义字段 “Country”。
4. How：即用户从事这个事件的方式。这个概念就比较广了，包括用户使用的设备、使用的浏览器、使用的 App 版本、操作系统版本、进入的渠道、跳转过来时的 referer 等，目前，神策分析预置了如下字段用来描述这类信息，使用者也可以根据自己的需要来增加相应的自定义字段。
5.  What：描述用户所做的这个事件的具体内容。在我们的数据接口中，首先是使用 event 这个事件名称，来对用户所做的内容做初步的分类。event 的划分和设计也有一定的指导原则，我们会在后文详细描述。除了 event 这个至关重要的字段以外，我们并没有设置太多预置字段，而是请使用者根据每个产品以及每个事件的实际情况和分析的需求，来进行具体的设置，下面给出一些典型的例子：
    - 对于一个“购买”类型的事件，则可能需要记录的字段有：商品名称、商品类型、购买数量、购买金额、 付款方式等；
    - 对于一个“搜索”类型的事件，则可能需要记录的字段有：搜索关键词、搜索类型等；
    - 对于一个“点击”类型的事件，则可能需要记录的字段有：点击 URL、点击 title、点击位置等；
    - 对于一个“用户注册”类型的事件，则可能需要记录的字段有：注册渠道、注册邀请码等；
    - 对于一个“用户投诉”类型的事件，则可能需要记录的字段有：投诉内容、投诉对象、投诉渠道、投诉方式等；
    - 对于一个“申请退货”类型的事件，则可能需要记录的字段有：退货金额、退货原因、退货方式等。

```
$app_version：应用版本
$city： 城市
$manufacturer： 设备制造商，字符串类型，如"Apple"
$model： 设备型号，字符串类型，如"iphone6"
$os： 操作系统，字符串类型，如"iOS"
$os_version： 操作系统版本，字符串类型，如"8.1.1"
$screen_height： 屏幕高度，数字类型，如1920
$screen_width： 屏幕宽度，数字类型，如1080
$wifi： 是否 WIFI，BOOL类型，如true
```


## 自建模型
```json
{
	"user_id": "123456",    // 用户id，没有登录就用设备id，登录了就用userId
	"time": 1434556935000,
	"event_type": "track",
	"event": "ViewPage",
	"project": "ebiz_test",

    // 事件属性
	"properties": {
		"$is_login_id":true, //此参数请慎重使用，详细介绍请参考文档底部 8.1 $is_login_id 参数说明
		"$app_version":"1.3",
		"$wifi":true,
		"$ip":"180.79.35.65",
		"$province":"湖南",
		"$city":"长沙",
		"$user_agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
		"$screen_width":320,
		"$screen_height":568,
		"product_id":12345,
		"product_name":"苹果",
		"product_classify":"水果",
		"product_price":14.0,
        "$ip" : "180.79.35.65",
		"page_name" : "网站首页",
		"url" : "www.demo.com",
		"referer" : "www.referer.com"
	}
}

```

View Product -> Add to Cart -> View Cart -> Place Order -> ...

```json
{
	"distinct_id": "123456",
	"time": 1434556935000,
	"event": "PlaceOrder",
	"project": "ebiz_test",
	"time_free": true, //建议在导入历史数据时使用，SDK 采集的实时数据不建议使用
	"properties": {
		"$is_login_id":true, //此参数请慎重使用，详细介绍请参考文档底部 8.1 $is_login_id 参数说明
		"$app_version":"1.3",
		"$wifi":true,
		"$ip":"180.79.35.65",
		"$province":"湖南",
		"$city":"长沙",
		"$user_agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
		"$screen_width":320,
		"$screen_height":568,
		"product_id":12345,
		"product_name":"苹果",
		"product_classify":"水果",
		"product_price":14.0,
        "last_event": "ViewProduct",
        "last_event_id": 6666666
	}
}
```