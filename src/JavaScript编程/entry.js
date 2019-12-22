/**
 * var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
  a: {
   b: {
     c: {
       dd: 'abcdd'
     }
   },
   d: {
     xx: 'adxx'
   },
   e: 'ae'
  }
}
 */

function nested(obj) {
  function getNested(key) {
    const value = obj[key];
    const lastIndex = key.lastIndexOf(value);
    if (lastIndex > -1) {
      delete obj[key];
      const mainKey = key.slice(0, lastIndex);
      const subKey = key.slice(lastIndex + 1);
      if (obj[mainKey]) {
        obj[mainKey][subKey] = value;
      } else {
        obj[mainKey] = { [subKey]: value };
      }
      if (/\./.test(mainKey)) {
        getNested(mainKey);
      }
    }
  }
  Reflect.ownKeys(obj).map(key => getNested(key));
  return obj;
}

/**
 * var entry = {
a: {
 b: {
   c: {
     dd: 'abcdd'
   }
 },
 d: {
   xx: 'adxx'
 },
 e: 'ae'
}
}

// 要求转换成如下对象
var output = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}
 */

const utils = {
  isObject(params) {
    return Object.prototype.toString.call(params) === '[object Object]';
  },
};

function flatObj(obj, parentKey = '', result = {}) {
  Reflect.ownKeys(obj).map(key => {
    let keyName = `${parentKey}${key}`;
    if (utils.isObject(obj(key))) {
      flatObj(obj[key], keyName + '.', result);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}
