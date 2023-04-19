/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法

  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
  return Promise.resolve(a + b);
}

// 串行
function sum(arr) {
  if (arr.length === 1) return arr[0];
  return arr.reduce((a, b) => Promise.resolve(a).then(a => add(a, b)));
}

// 并行
function chunk(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(i / size);
    result[index] = result[index] || [];
    result[index].push(arr[i]);
  }
  return result;
}

function parallelSum(arr) {
  if (arr.length === 1) return arr[0];
  const promiseList = chunk(arr, 2).map(([a, b]) => (b === undefined ? Promise.resolve(a) : add(a, b)));
  return Promise.all(promiseList).then(list => parallelSum(list));
}

class Scheduler {
  constructor(concurrency) {
    this.maxCount = concurrency;
    this.runCount = 0;
    this.taskList = [];
    this.result = [];
  }

  add(promiseCreator) {
    this.taskList.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.taskList.length; i++) {
      this.request();
    }
    return Promise.resolve(this.result);
  }

  request() {
    if (!this.taskList.length || this.runCount >= this.maxCount) {
      return;
    }
    this.runCount++;
    this.taskList
      .shift()()
      .then(value => {
        this.runCount--;
        this.request();
        this.result.push(value);
      });
  }
}

// 控制并发数目
async function sum(arr, concurrency) {
  if (arr.length === 1) return arr[0];
  const scheduler = new Scheduler(concurrency);
  const promiseList = chunk(arr, 2).map(([a, b]) => (b === undefined ? Promise.resolve(a) : add(a, b)));
  promiseList.map(promise => scheduler.add(promise));
  return scheduler.taskStart();
}

class Scheduler {
  constructor(concurrency) {
    this.maxCount = concurrency;
    this.runCount = 0;
    this.taskList = [];
    this.result = [];
  }

  add(promise) {
    this.taskList.push(promise);
  }

  run() {
    if (!this.taskList.length || this.runCount >= this.maxCount) {
      return;
    }
    this.runCount++;
    this.taskList
      .shift()()
      .then(value => {
        this.runCount--;
        this.result.push(value);
        this.run();
      });
  }

  taskStart() {
    for (let i = 0; i < this.taskList.length; i++) {
      this.run();
    }
    return Promise.resolve(this.result);
  }
}

function sum(arr, concurrency) {
  if (arr.length === 1) return arr[0];
  const promiseList = chunk(arr, 2).map(([a, b]) => (b === undefined ? Promise.resolve(b) : add(a, b)));
  const scheduler = new Scheduler(concurrency);
  promiseList.map(promise => scheduler.add(promise));
  return scheduler.taskStart();
}
