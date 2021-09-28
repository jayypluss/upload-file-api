"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const ListController = {
    async listAll(req, res) {
        // directory path
        // const dir = '../../../files/upload/static/cache';
        const dir = path_1.default.join(__dirname, '../../../files/upload/static/cache/');
        // list all files in the directory
        fs.readdir(dir, (err, files) => {
            if (err) {
                if (err.code == 'ENOENT')
                    return res.status(200).send({ message: 'No files in cache.' });
                return res.status(500).send({ err });
            }
            // files object contains all files names
            // log them on console
            files.forEach(file => {
                console.log(file);
            });
            if (files)
                return res.status(200).send({ files });
        });
    },
};
exports.default = ListController;
