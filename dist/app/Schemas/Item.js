"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.itemsSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    categoryId: {
        type: String,
        ref: 'Category'
    },
    name: {
        type: String,
        unique: true
    },
    description: String,
    fileName: String,
    thumbFileName: String,
});
mongoose_1.model('Item', exports.itemsSchema);
