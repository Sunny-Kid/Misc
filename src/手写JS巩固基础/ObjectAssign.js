Object.defineProperty('assign', {
  value: function(target, ...args) {
    if (target == null) {
      throw new TypeError('Cannot convert null or undefined to Object');
    }
    for (let i = 0; i < args.length; i++) {
      const nextSource = args[i];
      for (const key in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
          target[key] = nextSource[key];
        }
      }
    }
    return target;
  },
  enumerable: false,
  writable: true,
  configurable: true,
});
