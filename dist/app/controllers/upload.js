"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../../utils/config/multer"));
const uploadOne_config_1 = require("../../utils/config/routes/uploadOne.config");
const mongoose_1 = require("mongoose");
const fs_1 = require("fs");
const ImageSchemaModel = mongoose_1.model('Image');
const UploadController = {
    async uploadOne(req, res) {
        try {
            const multer = util_1.promisify(multer_1.default(multer_2.default(uploadOne_config_1.MulterConfig)).single('file'));
            await multer(req, res);
            if (!req.file) {
                return res
                    .status(400)
                    .send({ message: 'Please upload a file!' });
            }
            return res.sendStatus(204);
        }
        catch (error) {
            if (error.message === 'LIMIT_FILE_SIZE') {
                return res.status(500).send({
                    message: `File size cannot be larger than ${uploadOne_config_1.MulterConfig}MB!`,
                });
            }
            if (error.message === 'INVALID_FILE_EXTNAME') {
                return res.status(400).send({
                    message: 'File type is invalid',
                    FilesTypeAccept: uploadOne_config_1.MulterConfig.AllowFile,
                });
            }
            return res.status(400).send({
                message: "We Unfortunately can't resolve your request, try again",
            });
        }
    },
    async multiUpload(req, res) {
        try {
            const multer = util_1.promisify(multer_1.default(multer_2.default(uploadOne_config_1.MulterConfig)).array('files'));
            await multer(req, res);
            if (!req.files) {
                return res
                    .status(400)
                    .send({ message: 'Please upload a file!' });
            }
            const newSavedImages = [];
            for (const file of req.files) {
                const image = new ImageSchemaModel({
                    fileName: file.originalname,
                    file: {
                        data: fs_1.readFileSync(file.path),
                        contentType: file.mimetype
                    }
                });
                let savedImage = await image.save();
                newSavedImages.push({
                    _id: savedImage._id,
                    // @ts-ignore
                    filename: savedImage.fileName,
                    // @ts-ignore
                    contentType: savedImage.file.contentType
                });
                // newSavedImages.push(savedImage)
            }
            return res.status(200).send(newSavedImages);
        }
        catch (error) {
            if (error.message === 'LIMIT_FILE_SIZE') {
                return res.status(500).send({
                    message: `File size cannot be larger than ${uploadOne_config_1.MulterConfig}MB!`,
                });
            }
            if (error.message === 'INVALID_FILE_EXTNAME') {
                return res.status(400).send({
                    message: 'File type is invalid',
                    FilesTypeAccept: uploadOne_config_1.MulterConfig.AllowFile,
                });
            }
            return res.status(400).send({
                message: "We Unfortunately can't resolve your request, try again",
            });
        }
    },
};
exports.default = UploadController;
