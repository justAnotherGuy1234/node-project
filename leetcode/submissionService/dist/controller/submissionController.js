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
exports.submissionController = void 0;
const submissionRepo_1 = require("../repo/submissionRepo");
const submissionService_1 = require("../service/submissionService");
const submissionRepo = new submissionRepo_1.SubmissionRepo();
const submissionService = new submissionService_1.SubmissionService(submissionRepo);
exports.submissionController = {
    createSubmission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { problemId, code, language } = req.body;
            const submission = yield submissionService.createSubmissionService({ problemId, code, language });
            return res.json({
                "msg": "created submission successfully",
                "data": submission
            });
        });
    },
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const submissionId = id;
            const { status } = req.body;
            const submission = yield submissionService.updateSubmissionService({ submissionId, status });
            if (!submission) {
                return res.status(500).json({
                    "msg": "failed to update submission status"
                });
            }
            return res.json({
                "msg": "updated submission status successffully",
                "data": submission
            });
        });
    }
};
