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
  const result = {};
  function getNested(key) {
    const value = obj[key] || result[key];
    const lastIndex = key.lastIndexOf('.');
    if (lastIndex > -1) {
      delete result[key];
      const mainKey = key.slice(0, lastIndex);
      const subKey = key.slice(lastIndex + 1);
      if (result[mainKey]) {
        result[mainKey][subKey] = value;
      } else {
        result[mainKey] = { [subKey]: value };
      }
      if (/./.test(mainKey)) {
        getNested(mainKey);
      }
    }
  }
  Object.keys(obj).map(getNested);
  return result;
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

var utils = {
  isObject(params) {
    return Object.prototype.toString.call(params) === '[object Object]';
  },
};

function flatObj(obj, parentKey = '', result = {}) {
  Reflect.ownKeys(obj).map(key => {
    let keyName = `${parentKey}${key}`;
    if (utils.isObject(obj[key])) {
      flatObj(obj[key], keyName + '.', result);
    } else {
      result[keyName] = obj[key];
    }
  });
  return result;
}
