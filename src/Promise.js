// 定义Promise的三种状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

export default class PromiseV2 {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolveCbs = [];
    this.rejectCbs = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject.apply(this, error);
    }
  }

  resolve(value) {
    /** 考虑 resolve thenable 的情况 */
    const self = this;
    if (value instanceof PromiseV2) {
      return value.then(self.resolve, self.reject);
    }
    setTimeout(() => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.value = value;
      this.resolveCbs.forEach(resolveCb => {
        resolveCb(value);
      });
    });
  }

  reject(reason) {
    setTimeout(() => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.value = reason;
      this.rejectCbs.forEach(rejectCb => {
        rejectCb(reason);
      });
    });
  }

  then(resolveFn, rejectFn) {
    const self = this;
    /** 考虑非函数情况下值的透传 */
    resolveFn = typeof resolveFn === 'function' ? resolveFn : value => value;
    rejectFn =
      typeof rejectFn === 'function'
        ? rejectFn
        : e => {
            throw e;
          };
    if (this.state === FULFILLED) {
      return new PromiseV2((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = resolveFn(self.value);
            if (x instanceof PromiseV2) {
              x.then(resolve);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    if (self.status === REJECTED) {
      return new PromiseV2(function(resolve, reject) {
        setTimeout(() => {
          try {
            let x = rejectFn(self.val);
            if (x instanceof PromiseV2) {
              x.then(resolve);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    if (self.status === PENDING) {
      return new PromiseV2((resolve, reject) => {
        self.onResolvedCallback.push(value => {
          try {
            let x = resolveFn(value);
            if (x instanceof PromiseV2) {
              x.then(resolve);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });

        self.onRejectedCallback.push(reason => {
          try {
            let x = rejectFn(reason);
            if (x instanceof PromiseV2) {
              x.then(resolve);
            } else {
              resolve(x);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }

  static all(arr) {
    if (!Array.isArray(arr)) throw new Error('arguments must be a array');
    const res = [];
    let num = 0;
    return new PromiseV2((resolve, reject) => {
      arr.forEach(p => {
        p.then(val => {
          res.push(val);
          if (++num === arr.length) resolve(res);
        }).catch(err => reject(err));
      });
    });
  }

  static race(arr) {
    if (!Array.isArray(arr)) throw new Error('arguments must be a array');
    return new PromiseV2((resolve, reject) => {
      arr.forEach(p => p.then(resolve, reject));
    });
  }
}
