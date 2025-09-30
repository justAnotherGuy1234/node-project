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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const evaluation_worker_1 = require("./worker/evaluation.worker");
const pullingImage_1 = require("./util/container/pullingImage");
const contants_1 = require("./util/contants");
const runCode_1 = require("./util/container/runCode");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(8000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server started at port", 8000);
    yield (0, evaluation_worker_1.startWorker)();
    console.log("worker started successfully in evaluation service");
    yield (0, pullingImage_1.pullAllImages)();
    console.log("image pulled successfully");
    //await testCode()
    yield testCppCode();
}));
function testCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const code = `
print("hello")
print("bye")
    `;
        yield (0, runCode_1.runCode)({
            code: code,
            timeLimit: 3000,
            language: "python",
            imageName: contants_1.PYTHON_IMAGE
        });
    });
}
function testCppCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const code = `
#include<iostream>

int main(){
    std::cout<<"hello world";
    return 0;
}
    `;
        yield (0, runCode_1.runCode)({
            code: code,
            language: "cpp",
            timeLimit: 1000,
            imageName: contants_1.CPP_IMAGE
        });
    });
}
