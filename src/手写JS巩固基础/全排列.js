const permutation = arr => {
  const totalLength = arr.length;
  const result = [];
  const arrange = (tempArr, leftArr) => {
    if (tempArr.length === totalLength) {
      result.push(tempArr.join(''));
    } else {
      leftArr.forEach((item, index) => {
        const copiedArr = leftArr.slice();
        copiedArr.splice(index, 1);
        arrange(tempArr.concat(item), copiedArr);
      });
    }
  };
  arrange([], arr);
  return result;
};

permutation(['a', 'b', 'c', 'd']);
