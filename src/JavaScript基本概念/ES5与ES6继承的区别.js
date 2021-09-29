function Parent(name) {
  this.name = name;
  this.colors = ['red', 'green', 'blue'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 组合继承的缺点：调用了两次 Parent 构造函数
function inherit(child, parent) {
  const proto = Object.create(parent.prototype);
  proto.constructor = child;
  child.prototype = proto;
}

// ES5中的继承的本质其实是先创建子类的实例对象 this，然后再将父类的方法添加到 this 上面去 Parent.call(this)。
// 但是Class的继承机制完全不同，它是先创建父类的实例对象的this(调用super方法)，然后再用子类的构造函数修改this。
// 根本原因：创建子类实例对象 this 和父类实例对象 this 的先后顺序不同
