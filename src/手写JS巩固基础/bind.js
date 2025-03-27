function MySymbol(obj) {
  const uuid = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
  if (Object.prototype.hasOwnProperty.call(obj, uuid)) {
    MySymbol(obj);
  }
  return uuid;
}

Function.prototype.bind = function (context, ...presetArgs) {
  if (typeof this !== 'function') {
    throw new Error();
  }

  const self = this;
  return function F(...restArgs) {
    // 考虑 bind 返回的函数作为构造函数执行, this 指向实例
    if (this instanceof F) {
      return new self(...presetArgs, ...restArgs);
    }
    return self.apply(context, [...presetArgs, ...restArgs]);
  };
};

Function.prototype.bind = function (context, ...presetArgs) {
  context = typeof context === 'object' ? context : window;
  const self = this;
  return function F(...restArgs) {
    if (this instanceof F) {
      return new self(...presetArgs, ...restArgs);
    }
    return self.apply(context, [...presetArgs, ...restArgs]);
  };
};
