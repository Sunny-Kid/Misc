// 题目：设计一个简单的异步任务队列执行器，要求执行并发数为 2 From TapTap 面试

class Scheduler {
  constructor() {
    this.parallelCount = 2;
    this.queue = [];
    this.running = 0;
  }

  run(task) {
    return new Promise((resolve, reject) => {
      const execute = () => {
        this.running++;
        task()
          .then(resolve, reject)
          .finally(() => {
            this.running--;
            if (this.queue.length) {
              this.queue.shift()();
            }
          });
      };
      if (this.running < this.limit) {
        execute();
      } else {
        this.queue.push(execute);
      }
    });
  }
}

function test() {
  const generatePromise = (time, data) => new Promise(resolve => setTimeout(resolve, time, data));
  const scheduler = new Scheduler();

  scheduler.run(() => generatePromise(400, 4)).then(data => console.log(data));
  scheduler.run(() => generatePromise(200, 2)).then(data => console.log(data));
  scheduler.run(() => generatePromise(400, 3)).then(data => console.log(data));
  scheduler.run(() => generatePromise(100, 1)).then(data => console.log(data));
}

test(); // 打印结果: 2 4 1 3
