"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProblemSchema = void 0;
const zod_1 = require("zod");
exports.createProblemSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    difficulty: zod_1.z.enum(['easy', 'medium', 'hard']),
    testCase: zod_1.z.array(zod_1.z.object({
        input: zod_1.z.string(),
        output: zod_1.z.string()
    }))
});
