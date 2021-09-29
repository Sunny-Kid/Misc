/**
 * 'abcaakjbb' => {'a':2,'b':2}
 * 'abbkejsbcccwqaa' => {'c':3}
 */
const result = str.split('');
result.sort();
const finalStr = result.join('');
const formatRegExp = str => str.match(/(\w)\1*/g);
const maxLength = Math.max(...formatRegExp(finalStr).map(s => s.length));

const res = arr.reduce((prev, curr) => {
  if (curr.length === maxLength) {
    prev[curr[0]] = maxLength;
  }
  return prev;
}, {});

console.log(res);
