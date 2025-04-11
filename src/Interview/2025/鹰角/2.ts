// 支持线程恢复后时间校准
// 支持手动暂停和续播
// 精度为毫秒级

class Countdown {
  constructor() {
    this.paused = false;
    this.startTime = undefined;
    this.timer = undefined;
    this.runningWorkerTime = 0;
  }
  start(duration) {
    this.startTime = duration || Date.now();
    window.addEventListener('onpageShow', () => {
      if (this.runningWorkerTime > 0) {
        this.startTime = this.startTime + this.runningWorkerTime;
      }
    });
    if (!this.paused && this.startTime >= 0) {
      this.timer = setTimeout(() => {
        this.startTime = this.startTime - 1;
        this.start(this.startTime);
      }, 1);
    } else {
      this.pause();
    }
    this.handlePageHide();
  }

  pause() {
    clearTimeout(this.timer);
    this.paused = true;
  }
  resume() {
    this.start(this.startTime);
    this.paused = false;
  }
  
  // 触发UI更新，触发频率为每秒一次，不需要实现
  update() {
    const isNewSecond = this.startTime > 0 && this.startTime % 1000 === 0;
    if (isNewSecond) {
      console.log(this.startTime);
    }
  }
}