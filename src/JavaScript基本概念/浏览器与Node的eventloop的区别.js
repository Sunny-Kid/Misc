浏览器是先清空微任务，再去执行宏任务

Node 10以前：
执行完一个阶段的所有任务
执行完nextTick队列里面的内容
然后执行完微任务队列的内容

浏览器和Node 环境下，microtask 任务队列的执行时机不同

Node端，microtask 在事件循环的各个阶段之间执行
浏览器端，microtask 在事件循环的 macrotask 执行完之后执行
