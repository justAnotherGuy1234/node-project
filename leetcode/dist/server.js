"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./route/v0/userRoute"));
const problemRoute_1 = __importDefault(require("./route/v0/problemRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5000;
app.use("/api/v0/user", userRoute_1.default);
app.use("/api/v0/problem", problemRoute_1.default);
app.listen(port, () => {
    console.log("server runing on port : ", port);
});
