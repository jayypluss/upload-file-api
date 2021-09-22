"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const { PORT } = process.env || 9000;
app_1.default.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
