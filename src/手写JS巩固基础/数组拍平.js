const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]

const res1 = arr.flat(Infinity);

const flatten = arr => {
  return arr.reduce((accu, curr) => {
    return accu.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
};
const res4 = flatten(arr);
