add(1)(2)(3) === 6;
add(1, 2, 3)(4) === 10;
add(1)(2)(3)(4)(5) === 15;

/** 参数不定长柯里化 */
function curry(fn, ...presetArgs) {
  function curried(...resetArgs) {
    const allArgs = [...presetArgs, ...resetArgs];
    return curry.call(null, fn, ...allArgs);
  }

  curried.toString = () => {
    return fn.apply(null, presetArgs);
  };

  return curried;
}

function dynamicAdd(...args) {
  return args.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}

const add = curry(dynamicAdd);

/** 参数定长柯里化 */
function curry(fn, ...presetArgs) {
  const argsLength = fn.length;
  return function curried(...restArgs) {
    const allArgs = [...presetArgs, ...restArgs];
    if (allArgs >= argsLength) {
      return fn.apply(this, allArgs);
    } else {
      return curry.call(null, fn, ...allArgs);
    }
  };
}
