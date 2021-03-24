Function.prototype.bindRight = (thisObj, ...presetArgs) => {
  const fn = this;
  const length = fn.length - presetArgs.length;
  return function(...restArgs) {
    let res = [];
    let newArgs = presetArgs.reverse();
    // bindRight 传入的参数大于 restArgs，直接返回 reverse 数组，否则 slice 截取
    if (length > 0) {
      res = restArgs.slice(0, length);
    }
    return fn.apply(thisObj, [...res, ...newArgs]);
  };
};
