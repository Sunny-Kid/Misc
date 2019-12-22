/**
 * 'abcaakjbb' => {'a':2,'b':2}
 * 'abbkejsbcccwqaa' => {'c':3}
 */

const arr = str => str.match(/(\w)\1*/);
const maxLength = Math.max(...arr.map(s => s.length));

const result = arr.reduce((prev, curr) => {
  if (curr.length === maxLength) {
    prev[curr[0]] = maxLength;
  }
  return prev;
}, {});

console.log(result);
