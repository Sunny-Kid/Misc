// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

// 将多个类的接口“混入”（mix in）另一个类
function mixin(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        // 拷贝实例属性
        copyProperties(this, new mixin());
      }
    }
  }

  for (let mixin of mixins) {
    // 拷贝静态属性
    copyProperties(Mix, mixin);
    // 拷贝原型属性
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

const copyProperties = (target, source) => {
  const keys = Reflect.ownKeys(source);
  for (let key of keys) {
    if (key !== 'name' && key !== 'constructor' && key !== 'prototype') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
};
