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

const compose = (...presetArgs) => {
  return function(...restArgs) {
    presetArgs.reduceRight((accu, cb) => cb(...accu), restArgs);
  };
};

export default compose;
