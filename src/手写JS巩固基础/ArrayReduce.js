Array.prototype.reduce = (callback, initialValue) => {
  const self = this;
  if (self == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  let accu = typeof initialValue === 'undefined' ? self[0] : initialValue;
  for (let i = 0; i < self.length; i++) {
    accu = callback.call(undefined, accu, self[i], i, self);
  }
  return accu;
};
