class SimpleLimit {
  private limit: number;
  private current: number;
  private queue: (() => Promise<void>)[] = [];
  private loopId: NodeJS.Timeout | null = null;
  constructor(limit: number) {
    this.limit = limit;
    this.current = 0;
  }
  add(fn: () => Promise<void>) {
    this.queue.push(fn);
  }
  async loop() {
    if (this.queue.length === 0 || this.current >= this.limit) return;

    this.current += 1;
    const fn = this.queue.shift();
    if (fn) {
      await fn();
    }
    this.current -= 1;
  }

  getQueueLength() {
    return this.queue.length;
  }

  getCurrent() {
    return this.current;
  }
  start() {
    this.current = 0;
    this.loopId = setInterval(() => {
      this.loop();
    }, 10);
  }
  stop() {
    if (this.loopId) {
      clearInterval(this.loopId);
    }

    this.current = 0;
    this.queue = [];
    this.loopId = null;
  }
  pause() {
    if (this.loopId) {
      clearInterval(this.loopId);
    }
  }
}

export default SimpleLimit;
