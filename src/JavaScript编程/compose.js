const compose = (...args) => {
  let count = args.length - 1;
  let result;
  return function f1(...args2) {
    result = args[count].apply(this, args2);
    while (--count > 0) {
      return f1.call(this, result);
    }
    return result;
  };
};
