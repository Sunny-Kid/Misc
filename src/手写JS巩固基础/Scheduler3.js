// 实现一个带并发控制的异步调度器

class Scheduler {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.runningCount = 0;
    this.tasks = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  run() {
    if (this.tasks.length && this.runningCount < this.parallelCount) {
      this.runningCount++;
      const { task, resolve, reject } = this.tasks.shift();
      task()
        .then(resolve, reject)
        .finally(res => {
          this.runningCount--;
          this.run();
        });
    }
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
