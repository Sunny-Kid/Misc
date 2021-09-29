const isPalindrome = str => {
  const stringify = '' + str;
  const reversedStr = stringify
    .split()
    .reverse()
    .join();
  return reversedStr === stringify;
};

const isPalindrome = x => {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false;
  } else if (0 <= x && x < 10) {
    return true;
  }
  x = '' + x;
  for (let i = 0; i < Math.floor(x.length / 2); i++) {
    if (x[i] !== x[x.length - i - 1]) {
      return false;
    }
  }
  return true;
};
