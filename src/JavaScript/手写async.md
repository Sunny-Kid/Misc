```javascript
async function fn(args){
  // ...
}

// 等同于

function fn(args){ 
  return spawn(function*() {
    // ...
  }); 
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(fn) {
      try {
        var next = fn();
      } catch(err) {
        return reject(err);
      }
      if (next.done) return resolve(next.value);
      Promise.resolve(next.value).then(
        (val) => step(function () { return gen.next(val) },
        (err) => step(function () { return gen.throw(err) })
      )
    }
    step(() => gen.next(undefined));
  })
}
```