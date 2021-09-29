Array.prototype.map = function(callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const self = this;
  const result = [];
  for (let i = 0; i < self.length; i++) {
    result[i] = callback.call(thisArg, self[i], i, self);
  }
  return result;
};
