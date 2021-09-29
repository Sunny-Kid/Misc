// 手写 JSON
window.JSON = {
  parse: jsonStr => {
    return eval(`(${jsonStr})`);
  },
  stringify: jsonObj => {
    let result = '';
    let currVal;
    if (jsonObj === null) {
      return String(jsonObj);
    }
    switch (typeof jsonObj) {
      case 'number':
      case 'boolean':
        return String(jsonObj);
      case 'string':
        return '"' + jsonObj + '"';
      case 'undefined':
      case 'function':
        return undefined;
    }
    switch (Object.prototype.toString.call(jsonObj)) {
      case '[object Array]':
        result += '[';
        for (let i = 0; i < jsonObj.length; i++) {
          currVal = JSON.stringify(jsonObj[i]);
          result += (currVal === undefined ? null : currVal) + ',';
        }
        if (result != '[') result = result.slice(0, -1);
        result += ']';
        return result;
      case '[object RegExp]':
        return {};
      case '[object Date]':
      case '[object String]':
        return `"${String(jsonObj)}"`;
      case '[object number]':
      case '[object boolean]':
        return String(jsonObj);
      case '[object Object]':
        result += '{';
        for (let [key, value] of Object.entries(jsonObj)) {
          result += `"${key}": ${JSON.stringify(value)},`;
        }
        if (result != '{') result = result.slice(0, -1);
        result += '}';
        return result;
    }
  },
};
