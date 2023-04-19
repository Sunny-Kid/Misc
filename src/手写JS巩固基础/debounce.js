function debounce(fn, wait = 50, immediate = false) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
