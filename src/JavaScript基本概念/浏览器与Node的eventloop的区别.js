浏览器是先清空微任务，再去执行宏任务

Node 10以前：
执行完一个阶段的所有任务
执行完nextTick队列里面的内容
然后执行完微任务队列的内容
