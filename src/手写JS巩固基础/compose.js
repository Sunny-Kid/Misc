const compose = (...args) => {
  const length = args.length;
  let count = length;
  return function F(...restArgs) {
    const result = args[count].apply(this, restArgs);
    if (count <= 0) {
      return result;
    } else {
      count--;
      return F.call(this, result);
    }
  };
};

const compose = (...fns) => {
  if (fns.length === 0) return num => num;
  const nonFunction = fns.find(fn => typeof fn !== 'function');
  if (nonFunction) {
    throw new TypeError(`${nonFunction} is not a function !`);
  }
  return function(...args) {
    return fns.reduceRight((params, fn) => (args === params ? fn(...params) : fn(params)), args);
  };
};

export default compose;
