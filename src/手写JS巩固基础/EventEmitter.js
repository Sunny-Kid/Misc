class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, cb) {
    this.listeners[eventName] ??= [];
    this.listeners[eventName].push(cb);
  }

  once(eventName, cb) {
    this.on(eventName, cb);
    // 使用一个标记来标明这是一个一次性的事件回调
    this.listeners[eventName].once = true;
  }

  off(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = null;
    }
  }

  emit(eventName, args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(fn => fn.apply(this, args));
      // 如果这个是一次性的事件的话，执行完成后销毁该事件
      if (this.listeners[eventName].once) this.off(eventName);
    }
  }
}
