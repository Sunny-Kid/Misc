一面：
1. 介绍下 CSS specificity

类型选择器（例如，h1）和伪元素（例如，::before）
类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）
ID 选择器（例如，#example）。

specificity 和元素的邻近关系无关！！

2. Function 的原型链问题
var a = function() {};
a.constructor === Function;
// 这里做个小试验你就知道了
Object.__proto__ === Function.prototype           // true
Function.prototype.__proto__ === Object.prototype // true

所以
Object instanceof Function  // true
Function instanceof Object // true

prototype是另一个对象，__proto__是指向prototype的指针属性。prototype对象一直通过[[Prototype]]往回追溯，根是Object.prototype，而Object.prototype的内部属性[[Prototype]]是null。

3. 关于 Fiber，简单介绍下



4. Hooks 的优缺点

5. 伪类和伪元素区别
::before, ::after 伪元素
:not, :hover, :active 伪类
:not 和 :is 伪类不会算在权重计算，但子元素会

6. eval 缺点
- 不安全，字符串代码被恶意篡改，会引起 XSS 攻击，最终会在扩展程序权限下，在用户计算机上运行恶意代码
- 不易调试，用chromeDev等调试工具无法打断点
- 性能问题，JavaScript 解释器会将 javascript 转换为机器代码，eval的使用都会强制浏览器进行变量名称查找，以确定变量在机器代码中的位置并设置其值

7. Redux 数据流
状态及页面逻辑从 里面抽取出来, 成为独立的 store, 页面逻辑就是 reducer（纯函数，执行修改 state）
及都是 Pure Component, 通过 connect 方法可以很方便地给它俩加一层 wrapper 从而建立起与 store 的联系: 可以通过 dispatch 向 store 注入 action, 促使 store 的状态进行变化, 同时又订阅了 store 的状态变化, 一旦状态变化, 被 connect 的组件也随之刷新
使用 dispatch 往 store 发送 action 的这个过程是可以被拦截的, 自然而然地就可以在这里增加各种 Middleware, 实现各种自定义功能, eg: logging

8. ES6 super 关键字
ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。
ps：super 关键字指代父类的实例，即父类的 this 对象。在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。

二面：
1. 手写编程题目
// f1为纯函数，没有任何异步逻辑
f1(‘abc’, 123, { b: 3 });    // 返回值5， 耗时100s
f1(‘abc’, 123, { b: 3 });    // 返回值5， 耗时100s

// 相同参数返回相同结果
function cache(f) {
  // …...TODO 
}

const f2 = cache(f1);

f2(‘abc’, 123, { b: 3 });    // 返回5， 耗时100s
f2(‘abc’, 123, { b: 3 });    // 返回5， 耗时0s

2. SDK 如何计算静态资源的缓存命中率？
  判断 resource Timing 中 transferSize 的响应头和响应体的大小之和

3. SDK 如何监听自身的错误然后做区分？
  SDK 运行时对于阻碍流程的 try catch 然后手动上报，自身错误通过服务端根据 SDK CDN 域名后缀进行清洗，分流到 SLARDAR_SDK，这里通过 isHitSampleByRate 函数来设置采样率，因为用一个错误又一个应用会发生，那就代表用了同样版本号的应用也会有，所以设置了 0.001 的采样率来限制上报次数

4. 微前端的场景下 SDK 如何区分子应用和父应用？
对于 XMLHttpRequest、 fetch 等 override，以便隔离个子应用的网络请求

获取并存储子应用的所有资源，代理子应用的监听错误函数，在触发错误时判断错误的来源是否为当前子应用，若为当前子应用的资源触发监听错误事件，不为忽略

5. 项目中采用什么做数据流管理？
自己的一套数据管理库 Reduck

6. 如何提升 webpack 构建打包速度？
- 首先引入 speed-measure-webpack-plugin 查看各个 loader 和 plugin 的耗时
- 减少路径查询工作，使用绝对路径配置 resolve.modules
- 使用 loader 把应用文件的范围缩小
- 适当删除不必要的 plugin，指定 mode
- 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

(1) 提取页面公共资源：
基础包分离：
使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 CommonsChunkPlugin 插件

(2) 使用高版本的 Webpack 和 Node.js
多进程/多实例构建：HappyPack(不维护了)、thread-loader
压缩代码

(3) 多进程并行压缩
webpack-paralle-uglify-pluginuglifyjs-webpack-plugin 开启 parallel 参数 (不支持ES6)terser-webpack-plugin 开启 parallel 参数
通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

DLL：
使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。HashedModuleIdsPlugin 可以解决模块数字id问题

充分利用缓存提升二次构建速度：
babel-loader 开启缓存
terser-webpack-plugin 开启缓存
使用 cache-loader 或者 hard-source-webpack-plugin

7. React 的最佳实践？

8. 如何增加静态资源的缓存？
进行合理分包，保证 hash 不变就行，从而提高静态资源的缓存命中率

9. 衡量 SDK 的性能指标有哪些？？
- 通过 benchmark API 对实例进行 API 的性能进行测试，Script 性能如下，此为各项监控开启的性能耗时，此处发现开启性能监控最大耗时达到了21ms，虽然看上去很少，但若和其他监控同时执行，加上引入业务代码的复杂性和移动端更弱的 CPU 性能，极有可能成为给业务带来 longtask 的罪魁祸首。性能监控性能成为了瓶颈。

根据 benchmark 结果并结合源码可以发现，性能监控所有指标项的开启均为同步执行，每一项指标都会对页面做事件监听或者 PerformanceObserver 监听，且这些原生监听耗时都在毫秒级。于是我们对性能做了如下优化：
1. 性能监控逻辑分片运行，将各项性能指标的监听同步拆为异步，用 requestIdleCallback 做调度并区分优先级。
2. 多个性能指标监听同一事件的公用监听器，例如 CLS 和 LCP 都需要监听 onBFCacheRestore，让他们只做一次 addEventListener。
3. 可以延迟执行的方法延迟执行，例如在 Chrome 中 PerformanceObserver 是有 buffer 的，可以直接获取到调用之前的性能指标，这些方法调用就可以等待页面完全加载完成之后执行，从而尽可能减少对业务页面首屏影响。

- 首先我们需要配置好空白组和实验组的 pages 以及 profile，触发一次 snapshot 之后，我们得到了多份报告，我们点击页面右下角的 compare 将空白组和实验组的数据进行比对。
1. 优化请求数量
2. 优化脚本执行
这部分属于 slardar 初始化逻辑的范畴，简单来说就是以下几点：
- 监控任务切片运行，区分优先级。
- 所有采样、数据运算、上报请求等数据后处理逻辑只在空闲时执行。
- 页面 load 之前仅执行必要的预收集逻辑，其他所有逻辑延后。
3. 优化脚本执行
- 所有 class 重构为 function
- 出入参的对象使用数组代替，通过 ts 元组来判断顺序。
- 精简表达

10. Redux 数据流问题

11. webpack的整个打包流程：
- 读取webpack的配置参数；
- 启动webpack，创建Compiler对象并开始解析项目；
- 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
- 对不同文件类型的依赖模块文件使用对应的Loader进行编译，最终转为Javascript文件；
- 整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

12. navigator.sendBeacon 为什么采用这种方式进行页面 unload 的时候进行上报？
- sendBeacon 将异步和非阻塞请求发送到服务器，不阻塞页面卸载或影响下一跳的性能，不受跨域限制
