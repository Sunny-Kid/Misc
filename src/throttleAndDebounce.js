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
  let previous = 0;
  let timer = null;
  return function(...args) {
    const self = this;
    const now = Date.now();
    if (now - previous < wait) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fn.apply(self, args);
      }, wait);
    } else {
      previous = now;
      fn.apply(self, args);
    }
  };
}
