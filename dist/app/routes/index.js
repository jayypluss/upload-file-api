"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../controllers/upload"));
const clear_1 = __importDefault(require("../controllers/clear"));
const Routes = express_1.Router();
Routes.post('/clear', clear_1.default.clearAll);
Routes.post('/upload', upload_1.default.uploadOne);
exports.default = Routes;
