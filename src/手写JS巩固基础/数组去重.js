const unique5 = arr => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i]);
    }
  }
  return res;
};

const unique1 = arr => {
  return Array.from(new Set(arr));
};

const unique2 = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}

const unique3 = arr => {
  arr.sort((a, b) => a - b);
  const loop = (index) => {
    if (index >= 1) {
      if (arr[index] === arr[index - 1]) {
        arr.splice(index, 1);
      }
      loop(index - 1);
    }
  };
  loop(arr.length - 1);
}

const unique4 = arr => {
  return arr.reduce((prev, curr) => {
    return prev.includes(curr) ? prev : [...prev, curr]
  }, []);
};
