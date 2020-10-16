function MySymbol(obj) {
  const uuid = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
  if (Object.prototype.hasOwnProperty.call(obj, uuid)) {
    MySymbol(obj);
  }
  return uuid;
}

Function.prototype.call = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('args must be function');
  }
  const symbol = Symbol('fn');
  context[symbol] = this;
  const res = context[symbol](...args);
  delete context[symbol];
  return res;
};

Function.prototype.apply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('args must be function');
  }
  const symbol = Symbol('fn');
  context[symbol] = this;
  const res = context[symbol](...args);
  delete context[symbol];
  return res;
};

Function.prototype.bind = function(context, ...presetArgs) {
  if (typeof this !== 'function') {
    throw new Error();
  }

  const self = this;
  return function F(...restArgs) {
    // 考虑绑定函数作为构造函数被 new 操作符调用
    if (this instanceof F) {
      return new self(...presetArgs, ...restArgs);
    }
    return self.apply(context, [...presetArgs, ...restArgs]);
  };
};
