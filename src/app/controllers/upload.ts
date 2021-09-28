import { Request, Response } from 'express';
import { promisify as Promisify } from 'util';
import Multer from 'multer';
import setConfigMulter from '../../utils/config/multer';
import { MulterConfig } from '../../utils/config/routes/uploadOne.config';
import {model} from "mongoose";
import {readFileSync} from "fs";

const ImageSchemaModel = model('Image')

const UploadController = {
    async uploadOne(req: Request, res: Response) {
        try {
            const multer = Promisify(
                Multer(setConfigMulter(MulterConfig)).single('file')
            );

            await multer(req, res);

            if (!req.file) {
                return res
                    .status(400)
                    .send({ message: 'Please upload a file!' });
            }

            return res.sendStatus(204);
        } catch (error) {
            if (error.message === 'LIMIT_FILE_SIZE') {
                return res.status(500).send({
                    message: `File size cannot be larger than ${MulterConfig}MB!`,
                });
            }

            if (error.message === 'INVALID_FILE_EXTNAME') {
                return res.status(400).send({
                    message: 'File type is invalid',
                    FilesTypeAccept: MulterConfig.AllowFile,
                });
            }

            return res.status(400).send({
                message:
                    "We Unfortunately can't resolve your request, try again",
            });
        }
    },
    async multiUpload(req: Request, res: Response) {
        try {
            const multer = Promisify(
                Multer(setConfigMulter(MulterConfig)).array('files')
            )

            await multer(req, res);

            if (!req.files) {
                return res
                    .status(400)
                    .send({ message: 'Please upload a file!' });
            }

            const newSavedImages = []

            for (const file of req.files as any[]) {
                const image = new ImageSchemaModel({
                    fileName: file.originalname,
                    file: {
                        data: readFileSync(file.path),
                        contentType: file.mimetype
                    }
                });

                let savedImage = await image.save();
                newSavedImages.push({
                    _id: savedImage._id,
                    filename: savedImage.fileName,
                    contentType: savedImage.file.contentType
                })
                // newSavedImages.push(savedImage)
            }

            return res.status(200).send(newSavedImages);
        } catch (error) {
            if (error.message === 'LIMIT_FILE_SIZE') {
                return res.status(500).send({
                    message: `File size cannot be larger than ${MulterConfig}MB!`,
                });
            }

            if (error.message === 'INVALID_FILE_EXTNAME') {
                return res.status(400).send({
                    message: 'File type is invalid',
                    FilesTypeAccept: MulterConfig.AllowFile,
                });
            }

            return res.status(400).send({
                message:
                    "We Unfortunately can't resolve your request, try again",
            });
        }
    },
};

export default UploadController;
