function debounce(fn, wait = 50, immediate = false) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

function throttle(fn, wait) {
  let flag = true;
  return function(...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, wait);
  };
}

function before(n, fn) {
  let result = null;
  return function(...args) {
    if (--n > 0) {
      result = fn.apply(this, args);
    }
    if (n <= 1) {
      fn = undefined;
    }
    return result;
  };
}
