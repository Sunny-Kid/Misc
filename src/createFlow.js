const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const log = console.log;
const subFlow = createFlow([() => delay(1000).then(() => log('c'))]);

createFlow([() => log('a'), () => log('b'), subFlow, [() => delay(1000).then(() => log('d')), () => log('e')]]).run(
  () => {
    console.log('done');
  },
);

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

class Flow {
  constructor(arr) {
    this.list = arr;
  }

  run(fn) {
    return this.list
      .reduce((accu, curr) => {
        return accu.then(() => {
          if (typeof curr === 'function') {
            return curr();
          } else if (curr instanceof Flow) {
            return curr.run();
          } else if (Array.isArray(curr)) {
            return createFlow(curr).run();
          }
        });
      }, Promise.resolve())
      .then(() => {
        fn && fn();
      });
  }
}

const createFlow = arr => {
  return new Flow(arr);
};
