/**
 * LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
 */

class LazyManCls {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    console.log(`Hi I am ${name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat(name) {
    const self = this;
    const fn = (function(name) {
      return function() {
        console.log(`I am eating ${name}`);
        self.next();
      };
    })(name);
    this.taskList.push(fn);
    return this;
  }

  sleep(time) {
    const self = this;
    const fn = (function() {
      return function() {
        setTimeout(() => {
          console.log(`等待了${time}秒...`);
          self.next();
        }, time * 1000);
      };
    })();
    this.taskList.push(fn);
    return this;
  }

  sleepFirst(time) {
    const self = this;
    const fn = (function() {
      return function() {
        setTimeout(() => {
          console.log(`等待了${time}秒...`);
          self.next();
        }, time * 1000);
      };
    })();
    this.taskList.unshift(fn);
    return this;
  }

  next() {
    const fn = this.taskList.shift();
    if (typeof fn === 'function') fn();
  }
}

const LazyMan = name => {
  return new LazyManCls(name);
};
