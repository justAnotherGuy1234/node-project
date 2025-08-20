"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetCookie;
function SetCookie(res, token) {
    try {
        res.cookie("cookie", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        });
    }
    catch (e) {
        console.log("error in set cookie function", e);
        return res.status(500).json("Internal server error");
    }
}
