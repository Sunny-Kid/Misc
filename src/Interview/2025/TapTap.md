1. 
```
class Scheduler {
    constructor() {
        this.limit = 2;
        this.queue = [];
        this.running = 0;
    }

    run(task) {
        return new Promise((resolve, reject) => {
            const execute = () => {
                this.running++;
                task().then(resolve, reject).finally(() => {
                    this.running--;
                    if (this.queue.length) {
                        this.queue.shift()();
                    }
                });
            };
            if (this.running < this.limit) {
                execute();
            } else {
                this.queue.push(execute);
            }
        });
    }
}

function test() {
    const generatePromise = (time, data) => new Promise(resolve => setTimeout(resolve, time, data));
    const scheduler = new Scheduler();

    scheduler.run(() => generatePromise(400, 4)).then(data => console.log(data));
    scheduler.run(() => generatePromise(200, 2)).then(data => console.log(data));
    scheduler.run(() => generatePromise(400, 3)).then(data => console.log(data));
    scheduler.run(() => generatePromise(100, 1)).then(data => console.log(data));
}

test(); // 2 4 1 3
```
2.
```
// 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
// 请你找出符合题意的 最短 子数组，并输出它的长度。

// 示例 1：

// 输入：nums = [2,6,4,8,10,9,15]
// 输出：5
// 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
// 示例 2：

// 输入：nums = [1,2,3,4]
// 输出：0
// 示例 3：

// 输入：nums = [1]
// 输出：0

var findUnsortedSubarray = function(nums) {
  if (isSorted(nums)) {
    return 0;
  }
  const numsSorted = [...nums].sort((a, b) => a - b);
  let left = 0;
  while (nums[left] === numsSorted[left]) {
    left++;
  }
  let right = nums.length - 1;
  while (nums[right] == numsSorted[right]) {
    right--;
  }
  return right - left + 1;
};

const isSorted = nums => {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      return false;
    }
  }
  return true;
};

var findUnsortedSubarray2 = function(nums) {
  const n = nums.length;
  let maxn = -Number.MAX_VALUE,
    right = -1;
  let minn = Number.MAX_VALUE,
    left = -1;
  for (let i = 0; i < n; i++) {
    if (maxn > nums[i]) {
      right = i;
    } else {
      maxn = nums[i];
    }
    if (minn < nums[n - i - 1]) {
      left = n - i - 1;
    } else {
      minn = nums[n - i - 1];
    }
  }
  return right === -1 ? 0 : right - left + 1;
};
```
