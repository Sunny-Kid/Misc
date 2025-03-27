1.编写curry.js
```js
实现函数的分步调用

function curry(fn, ...presetArgs) {
  const argsLength = fn.length;
  return function curried (...restArgs) {
    const totalArgs = [...presetArgs, ...restArgs];
    if (totalArgs.length >= argsLengh) {
      return fn.apply(this, totalArgs)
    }
    return curry.call(undefined, fn, ...totalArgs);
  }
}

function add(a, b) {
   return a + b;
}
var curried = curry(add);
console.log(curried(1)(2)); //3
function add2(a, b, c) {
   return a + b + c;
}
var curried = curry(add2);
console.log(curried(1)(2)(3)); //6
function add3(a, b, c, d) {
   return a + b + c + d;
}
var curried = curry(add3);
console.log(curried(1)(2)(3)(4)); //10
```
2. webpack 对于 require 的了解
3. useRef 和 useState 区别
4. 如果 useEffect 依赖项过多你会如何处理
4. 对于死代码删除如何去删除五个方法中导出的其中三个方法
5. SDK 批量上报
