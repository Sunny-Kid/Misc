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
          return result instanceof Promise ? result.then(resolve, reject) : Promise.resolve(result);
        });
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          const result = onRejected(self.reason);
          return result instanceof Promise ? result.then(resolve, reject) : Promise.reject(result);
        });
      } else if (self.value === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(self.value);
              return result instanceof Promise ? result.then(resolve, reject) : Promise.resolve(result);
            });
          } catch (error) {
            reject(error);
          }
        });
        self.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              return result instanceof Promise ? result.then(resolve, reject) : Promise.reject(result);
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
      for (let promise of promiseList) {
        Promise.resolve(promise).then(
          val => {
            count++;
            result.push(val);
            if (count === promiseList.length) {
              resolve(result);
            }
          },
          err => reject(err),
        );
      }
    });
  }

  static race(promiseList) {
    return new Promise((resolve, reject) => {
      for (let promise of promiseList) {
        Promise.resolve(promise).then(val => resolve(val), err => reject(err));
      }
    });
  }
}
