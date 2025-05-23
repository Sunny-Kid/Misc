async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    try {
      function step(next) {
        if (next.done) return resolve(next.value);
        Promise.resolve(next.value).then(val => step(gen.next(val)), err => step(gen.throw(err)));
      }
      step(gen.next());
    } catch (err) {
      return reject(err);
    }
  });
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    try {
      function step(next) {
        if (next.done) resolve(next.value);
        return Promise.resolve(next.value)
          .then(val => {
            return step(gen.next(val));
          })
          .catch(err => {
            return step(gen.throw(err));
          });
      }
      step(gen.next());
    } catch (error) {
      reject(error);
    }
  });
}
