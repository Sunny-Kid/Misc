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
