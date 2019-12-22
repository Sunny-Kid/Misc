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
