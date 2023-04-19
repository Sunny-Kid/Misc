const clone = (source, target) => {
  if (target == null) {
    throw new TypeError('Cannot convert null or undefined');
  }
  const to = Object(target);
  // only enumerable string properties
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      to[key] = source[key];
    }
  }
  return to;
};

const deepCopy = (source, map = new WeakMap()) => {
  if (typeof source !== 'object') {
    return;
  }
  if (map.has(source)) return map.get(source);
  let target = Array.isArray(source) ? [] : {};
  map.set(source, target);
  for (let key in target) {
    if (source.hasOwnProperty(key)) {
      if (!(key in target)) {
        if (source[key] instanceof Date) {
          target[key] = new Date(source[key].getTime());
        } else if (source[key] instanceof RegExp) {
          target[key] = new RegExp(source[key]);
        } else if (source[key] instanceof HTMLElement) {
          target[key] = source[key].cloneNode(true);
        } else {
          target[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
        }
      }
    }
  }
  return target;
};

const deepCopy = (source, map = new WeakMap()) => {
  if (map.has(source)) return map.get(source);
  const target = Array.isArray(source) ? [] : {};
  map.set(source, target);
  for (let key in target) {
    if (source.hasOwnProperty(key)) {
      if (!key in target) {
        if (source[key] instanceof Date) {
          target[key] = new Date(source[key].getTime());
        } else if (source[key instanceof RegExp]) {
          target[key] = new RegExp(source[key]);
        } else if (source[key] instanceof HTMLElement) {
          target[key] = source[key].cloneNode(true);
        } else {
          target[key] = typeof source[key] === 'object' ? deepCopy(source[key], map) : source[key];
        }
      }
    }
  }
};
