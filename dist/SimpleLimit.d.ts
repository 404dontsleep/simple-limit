declare class SimpleLimit {
    private limit;
    private current;
    private queue;
    private loopId;
    constructor(limit: number);
    add(fn: () => Promise<void>): void;
    loop(): Promise<void>;
    getQueueLength(): number;
    getCurrent(): number;
    start(): void;
    stop(): void;
    pause(): void;
}
export default SimpleLimit;
