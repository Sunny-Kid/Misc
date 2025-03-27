Function.prototype.apply = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('args must be function');
  }
  context = typeof context === 'object' ? context : window;
  const symbol = Symbol('fn');
  context[symbol] = this;
  const res = context[symbol](...args);
  delete context[symbol];
  return res;
};

Function.prototype.apply = function (context = window, args) {
  context = typeof context === 'object' ? context : window;
  const symbol = Symbol('fn');
  context[symbol] = this;
  const res = context[symbol](...args);
  delete context[symbol];
  return res;
};
