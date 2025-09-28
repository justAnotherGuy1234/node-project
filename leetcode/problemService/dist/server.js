"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problemRoute_1 = __importDefault(require("./route/problemRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v0/problem", problemRoute_1.default);
app.listen(5000, () => {
    console.log("server started at port 5000");
});
