// Promise 并行限制
class Scheduler {
  constructor() {
    this.maxCount = 2;
    this.runCount = 0;
    this.taskList = [];
  }

  add(promiseCreator) {
    this.taskList.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }

  request() {
    if (!this.taskList || !this.taskList.length || this.runCount >= this.maxCount) {
      return;
    }
    this.runCount++;
    this.taskList
      .shift()()
      .then(() => {
        this.runCount--;
        this.request();
      });
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.taskStart();

// 2
// 3
// 1
// 4
