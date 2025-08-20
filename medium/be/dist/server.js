"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./route/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const blogRoute_1 = __importDefault(require("./route/blogRoute"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json({ limit: "20mb" }));
app.use("/api/users", userRoutes_1.default); // user routes tested
app.use("/api/blog", blogRoute_1.default);
app.listen(port, () => {
    console.log("server running on port : ", port);
});
