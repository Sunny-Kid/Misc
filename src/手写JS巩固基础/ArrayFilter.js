Array.prototype.filter = (fn, thisArg) => {
  if (typeof fn !== 'function') throw new TypeError('参数必须为函数');
  if (!Array.isArray(self)) throw new TypeError('参数必须为数组！');
  const self = this;
  let result = [];
  for (let i = 0; i < self.length; i++) {
    if (fn.call(thisArg, self[i], i, self)) {
      result.push(self[i]);
    }
  }
  return result;
};
