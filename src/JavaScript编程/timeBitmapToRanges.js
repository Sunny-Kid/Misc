/**
 * 将48位的时间位图格式化成字符串
 * 要求：写一个函数timeBitmapToRanges，将下述规则描述的时间位图转换成一个选中时间区间的数组。
 * 规则描述：
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间。
 * 例如110000000000000000000000000000000000000000000000，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。
 * 一个位图中可能有多个不连续的时间区间被选中，例如110010000000000000000000000000000000000000000000，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 * 示例输入："110010000000000000000000000000000000000000000000"
 * 示例输出：["00:00~01:00", "02:00~02:30"]
 */

function format(num) {
  const left = Math.floor(num);
  const leftStr = String(left).padStart(2, '0');
  const right = num % 1 === 0.5 ? 30 : 0;
  const rightStr = String(right).padStart(2, '0');
  return leftStr + ':' + rightStr;
}

function timeBitmapToRanges(timeBitmap) {
  let index = 0;
  let ranges = [];
  while (index < timeBitmap.length) {
    if (timeBitmap[index] === '0') {
      index++;
      continue;
    }
    let curRange = { start: index, end: index };
    while (timeBitmap[index] === '1') {
      curRange.end = index;
      index++;
    }
    ranges.push(curRange);
  }

  return ranges.map(range => {
    return format(range.start * 0.5) + '~' + format(range.end * 0.5 + 0.5);
  });
}
