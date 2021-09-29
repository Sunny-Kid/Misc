Function.prototype.call = (context, ...presetArgs) => {
  const symbol = Symbol('fn');
  context[symbol] = this;
  const result = context[symbol](...presetArgs);
  delete context[symbol];
  return result;
};
