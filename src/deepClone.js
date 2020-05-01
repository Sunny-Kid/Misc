const checkType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * 深拷贝关注点：
 * 1. 循环引用
 * 2. 拷贝 Symbol 数据类型
 * @param {any} source
 * @param {WeakMap} hash
 */

const deepClone = (source, hash = new WeakMap()) => {
  let target;
  /** 增加 WeakMap 避免循环引用 */
  if (hash.has(source)) return hash.get(source);
  const sourceType = checkType(source);
  if (sourceType === 'Array') {
    target = [];
  } else if (sourceType === 'Object') {
    target = {};
  } else {
    return source;
  }
  hash.set(source, target);
  /** 这里使用了 Reflect.ownKeys() 获取所有的键值，同时包括 Symbol */
  Reflect.ownKeys(source).forEach(key => {
    const value = source[key];
    const valueType = checkType(value);
    if (valueType === 'Array' || valueType === 'Object') {
      target[key] = deepClone(value, hash);
    } else {
      target[key] = value;
    }
  });
  return target;
};
