// 定义Promise的三种状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

export default class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => {
          fn(value);
        });
      }
    };

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => {
          fn(reason);
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw new Error(error);
          };
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === FULFILLED) {
        setTimeout(() => {
          const result = onFulfilled(self.value);
          return result instanceof Promise ? result.then(resolve, reject) : resolve(result);
        });
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          const result = onRejected(self.reason);
          return result instanceof Promise ? result.then(resolve, reject) : reject(result);
        });
      } else if (self.value === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(self.value);
              return result instanceof Promise ? result.then(resolve, reject) : resolve(result);
            });
          } catch (error) {
            reject(error);
          }
        });
        self.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              return result instanceof Promise ? result.then(resolve, reject) : reject(result);
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    } else {
      return new Promise(resolve => resolve(value));
    }
  }

  static reject(reason) {
    return new Promise((_resolve, reject) => reject(reason));
  }

  static all(promiseList) {
    const result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0;i < promiseList.length;i++) {
        Promise.resolve(promiseList[i]).then(
          val => {
            result[i] = val;
            count++;
            if (count === promiseList.length) {
              resolve(result);
            }
          }
        ).catch(err => reject(err));
      }
    });
  }

  static allSettled(promiseList) {
    // const result = [];
    // let count = 0;
    // return new Promise((resolve, reject) => {
    //   for (let i = 0;i < promiseList.length;i++) {
    //     Promise.resolve(promiseList[i]).then(
    //       val => {
    //         result[i] = val;
    //         count++;
    //         if (count === result.length) {
    //           resolve(result);
    //         }
    //       }
    //     ).catch((err) => {
    //         result[i] = err;
    //         count++;
    //         if (count === result.length) {
    //           resolve(result);
    //         }
    //     });
    //   };
    // });
    const result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0;i < promiseList.length;i++) {
        Promise.resolve(promiseList[i]).then(
          val => {
            result[i] = val;
            count++;
            if (count === result.length) {
              resolve(result);
            }
          }
        )
      }
    })
  }

  static race(promiseList) {
    return new Promise((resolve, reject) => {
      for (let promise of promiseList) {
        Promise.resolve(promise).then(val => resolve(val), err => reject(err));
      }
    });
  }
}
// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，

// 使得以下程序能正确输出

class Scheduler {
  add(task) {}
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// 执行

addTask(1000, '1');

addTask(500, '2');

addTask(300, '3');

addTask(400, '4');

// output: 2 3 1 4
