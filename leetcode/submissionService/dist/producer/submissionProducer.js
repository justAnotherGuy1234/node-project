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
exports.SubmissionProducer = SubmissionProducer;
const submissionQueue_1 = require("../queue/submissionQueue");
function SubmissionProducer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const job = yield submissionQueue_1.submissionQueue.add("evaluate-submission", data);
            console.log("job added to submission queue - name of producer -- evaluate-submission ", data);
            return job.id || null;
        }
        catch (e) {
            console.log("error in submission producer", e);
            return null;
        }
    });
}
