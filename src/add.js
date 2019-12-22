add(1)(2)(3) === 6;
add(1, 2, 3)(4) === 10;
add(1)(2)(3)(4)(5) === 15;

function add(...args1) {
  const args = args1;

  function adder(...args2) {
    args.push(args2);
    return adder;
  }

  adder.toString = function() {
    return args.reduce((a, b) => a + b);
  };

  return adder;
}

function curry(fn) {
  const length = fn.length;
  const getCurried = (params = []) => () => {
    const args = params.concat([].slice.call(arguments));
    if (args.length < length) {
      getCurried(args);
    }
    return fn.apply(this, args);
  };
  return getCurried();
}
