"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionRoute_1 = __importDefault(require("./route/submissionRoute"));
//todo complete submission service main file 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v0/submission", submissionRoute_1.default);
app.listen(7000, () => {
    console.log("submission service started at port", 7000);
});
