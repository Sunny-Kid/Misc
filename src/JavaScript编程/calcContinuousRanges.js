/**
 * 编写一个函数
 * 使得输入[1, 2, 3, 5, 7, 8, 10]时，
 * 输出为[1 ~ 3, 5, 7 ~ 8, 10]
 */

function simplifyStr(nums) {
  const result = [];
  let temp = nums[0];
  nums.forEach((num, index) => {
    if (num + 1 !== nums[index + 1]) {
      if (temp !== num) {
        result.push(`${temp}~${num}`);
      } else {
        result.push(num);
      }
      temp = nums[index + 1];
    }
  });
  return result;
}

function calcContinuousRanges(arr) {
  let continuousRanges = [];
  let index = 0;
  while (index < arr.length) {
    // 先求出连续的区间再格式化输出
    const range = {
      start: arr[index],
      end: arr[index],
    };
    while (index < arr.length && arr[index + 1] === arr[index] + 1) {
      range.end = arr[index + 1];
      index++;
    }
    continuousRanges.push(range);
    index++;
  }
  // console.log(JSON.stringify(continuousRanges));
  const formatted = continuousRanges.map(({ start, end }) => {
    return start === end ? start : `${start}~${end}`;
  });
  console.log(formatted);
}

calcContinuousRanges([1, 2, 3, 5, 7, 8, 10]);
