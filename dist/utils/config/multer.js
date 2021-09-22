"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
function setConfigMulter({ QuantityLimit, FileSize, AllowFile, }) {
    const config = {
        dest: path_1.default.join(__dirname, '../../../files/upload/static/cache/'),
        storage: multer_1.diskStorage({
            destination: path_1.default.join(__dirname, '../../../files/upload/static/cache/'),
            filename: (req, file, cb) => {
                const date = new Date()
                    .getTime()
                    .toString()
                    .replace(/[\/\\:]/g, '_');
                const hash = crypto_1.default.randomBytes(24).toString('base64');
                const filename = `${hash}-${date}${path_1.default.extname(file.originalname)}`;
                return cb(null, filename);
            },
        }),
        limits: {
            files: QuantityLimit,
            fileSize: FileSize ? FileSize * 1024 * 1024 : undefined,
        },
        fileFilter: (req, file, cb) => {
            if (AllowFile) {
                const FileExtname = path_1.default
                    .extname(file.originalname)
                    .replace('.', '');
                if (AllowFile.includes(FileExtname)) {
                    return cb(null, true);
                }
                else {
                    cb(new Error('INVALID_FILE_EXTNAME'));
                }
            }
        },
    };
    return config;
}
exports.default = setConfigMulter;
