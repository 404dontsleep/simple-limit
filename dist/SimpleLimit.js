"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleLimit {
    constructor(limit) {
        this.queue = [];
        this.loopId = null;
        this.limit = limit;
        this.current = 0;
    }
    add(fn) {
        this.queue.push(fn);
    }
    loop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.length === 0 || this.current >= this.limit)
                return;
            this.current += 1;
            const fn = this.queue.shift();
            if (fn) {
                yield fn();
            }
            this.current -= 1;
        });
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
exports.default = SimpleLimit;
