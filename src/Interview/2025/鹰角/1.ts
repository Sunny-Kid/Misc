class RequestQueue {
  constructor(maxLength: number) {
    this.running = 0;
    this.maxLength = maxLength;
    this.tasks = [];
  };
  run() {
    if (this.running < this.maxLength && this.tasks.length > 0) {
      const { func, resolve, reject } = this.tasks.shift();
      this.running++;
      func().then(resolve, reject).finally(() => {
        this.running--;
        this.run();
      })
    }
  }
  request<T>(func: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.tasks.push({ func, resolve, reject });
      this.run();
    })
  }
}

type PickParameters<T extends (...args: any[] => any)> = T extends (...args: infer P => any) ? P : never;

const instance = new RequestQueue(3)

const promise1 = instance.request(async () => {
  await delay(100)
  return 1
})
const promise2 = instance.request(async () => {
  await delay(1000)
  return 2
})
const promise3 = instance.request(async () => {
  await delay(700)
  return 3
})
const promise4 = instance.request(async () => {
  // 等待100ms后执行
  await delay(900)
  return 4
})

await promise1 // 1
await promise4 // 4