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
const index_1 = require("./index");
const limit = new index_1.default(5);
limit.start();
setInterval(() => {
    limit.add(() => __awaiter(void 0, void 0, void 0, function* () {
        const time = Date.now();
        console.log(time, "add");
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(time, "end", Date.now() - time);
    }));
    console.log(limit.getCurrent(), limit.getQueueLength());
}, 100);
