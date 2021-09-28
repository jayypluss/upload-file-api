"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Item_1 = require("./Item");
const categorySchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true
    },
    renderIndex: Number,
    items: [Item_1.itemsSchema],
    type: String,
});
mongoose_1.model('Category', categorySchema);
