const clone = (source, target) => {
  if (target == null) {
    throw new TypeError('Cannot convert null or undefined');
  }
  const to = Object(target);
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      to[key] = source[key];
    }
  }
  return to;
};
