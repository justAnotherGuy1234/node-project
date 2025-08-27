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
exports.sanitize = sanitize;
const marked_1 = require("marked");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const turndown_1 = __importDefault(require("turndown"));
function sanitize(markdown) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!markdown || typeof markdown != "string") {
            console.log("markdown is empty or not type of string");
            return "";
        }
        try {
            const convertHtml = yield marked_1.marked.parse(markdown);
            console.log("converted html", convertHtml);
            const sanitize = (0, sanitize_html_1.default)(convertHtml, {
                allowedTags: sanitize_html_1.default.defaults.allowedTags.concat(["img", "pre", "code"]),
                allowedAttributes: Object.assign(Object.assign({}, sanitize_html_1.default.defaults.allowedAttributes), { "img": ["src", "target", "alt"], "pre": ["class"], "code": ["class"], "a": ["href", "target"] }),
                allowedSchemes: ["http", "https"],
                allowedSchemesByTag: {
                    "img": ["http", "https"]
                }
            });
            console.log("sanitize", sanitize);
            const tds = new turndown_1.default({
                headingStyle: 'atx'
            });
            const res = tds.turndown(sanitize);
            console.log("res", res);
            return res;
        }
        catch (e) {
            console.log("error in sanitizing markdown", e);
            return "";
        }
    });
}
