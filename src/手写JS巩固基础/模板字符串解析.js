var a = {
  b: 123,
  c: '456',
  e: '789',
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;
// => 'a123aa456aa {a.d}aaaa'
var SEPERATOR = '.';
var formatStr = str => {
  return str.replace(/\{(.*?)\}/g, (match, p1) => {
    const key = p1.split(SEPERATOR).slice(1);
    if (a[key] !== undefined) return a[key];
    return match;
  });
};
formatStr(str);
