function isObj(params) {
  return Object.prototype.toString.call(params) === '[object Object]';
}

function parseObj(obj) {
  let keys = Reflect.ownKeys(obj).sort();
  let newObj = {};
  for (let key of keys) {
    newObj[key] = isObj(newObj[key]) ? parseObj(obj[key]) : obj[key];
  }
  return newObj;
}

function parseArr(arr) {
  return [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
}
