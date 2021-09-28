"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchemaModel = mongoose_1.model('Image');
const DownloadController = {
    async downloadFile(req, res) {
        const image = await ImageSchemaModel.findOne({ fileName: req.params[0] });
        // @ts-ignore
        if (!image || !image.file || !image.file.contentType || !image.file.data)
            res.status(500).send({ message: `Couldn't find image by the name of: ${req.params[0]}` });
        // @ts-ignore
        return res.status(200).type(image.file.contentType).send(image.file.data);
    },
};
exports.default = DownloadController;
