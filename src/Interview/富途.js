const isMatch = (str) => {
  if (str.leng <= 1) return false;
  const arr = [];
  const hashMap = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  for (const char of str) {
    if (Object.values(hashMap).includes(char)) {
      arr.push(char);
    } else if (hashMap[char] !== arr.pop()) {
      return false;
    }
  }
  return !arr.length;
};

console.log(isMatch("(){()[{}]}"))   //true
console.log(isMatch("()({})"))        //true
console.log(isMatch("{()}[]{()}"))  //true
console.log(isMatch("[{{[()]}}]"))  //true
console.log(isMatch("({)}"))          //false
console.log(isMatch("{()]{}"))    // false

/** 
 * 写一个 mySetInterVal(fn, a, b), 每次间隔 a, a + b, a + 2b,..., a + nb 的时间,
 * 然后写一个 myClear, 停止上面的 mySetInterVal
*/
function mySetInterVal(fn, a, b) {
  const timer = {};
  function setOneTimer(fn, a, b){
    timer.id = setTimeout(()=>{
      console.log(a);
      fn();
      setOneTimer(fn, a + b, b);
    },a)
  }
  setOneTimer(fn, a, b);
  return timer;
}

function myClear(timer){
  clearTimeout(timer.id);
}

/**
 * 题目：以时间复杂度 O(n) 从长度为n的数组中找出同时满足以下两个条件的所有元素：
 * 该元素比放在它左边所有的元素都要大；
 * 该元素比放在它右边所有的元素都要小；
 */
const find_number = (arr) => {
  if (arr.length < 3) return [];
  const res = [];
  const right_min = new Array(arr.length);
  let min = arr[arr.length - 1];
  // 先生成一个新数组，每个位置的值记录它右边(子数组中)最小的值（不包含它本身）
  for (let i = arr.length - 2; i > 0; i--) {
    right_min[i] = min;
    if (arr[i] < min) {
      min = arr[i];
    }
    right_min[i - 1] = min;
  };
  console.log(right_min);
  let max = arr[0];
  for (let i = 1; i < arr.length - 1; i++) {
    // 如果当前值是比它前面最大的值还要大
    if (arr[i] > max) {
      max = arr[i];
      // 并且比它右边最小的值还要小，则满足条件
      if (arr[i] < right_min[i]) {
        res.push(max);
      }
    }
  }
  return res;
};

find_number([1,2,4,3,10,13,15,12,16,18,17]); // [2, 10, 16]
