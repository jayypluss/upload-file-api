"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.imageSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    file: {
        data: Buffer,
        contentType: String
    },
    fileName: String
});
mongoose_1.model('Image', exports.imageSchema);
