"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const APP = express_1.default();
APP.use(cors_1.default());
APP.use(express_1.default.urlencoded({ extended: true }));
APP.use(express_1.default.json());
APP.use('/api', routes_1.default);
exports.default = APP;
