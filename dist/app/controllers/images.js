"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchemaModel = mongoose_1.model('Image');
const ImagesController = {
    async listAll(req, res) {
        const images = await ImageSchemaModel.find({}, '-file');
        return res.status(200).send(images);
    },
    async deleteImage(req, res) {
        const id = req.params.imageId;
        const imageDeleteResponse = await ImageSchemaModel.deleteOne({ _id: id });
        if (imageDeleteResponse.deletedCount > 0)
            return res.status(200).send({ message: `Image deleted suscessfully. `, imageId: id, imageDeleteResponse });
        else
            return res.status(500).send({ message: `Couldn't delete Image.`, imageId: id, imageDeleteResponse });
    },
};
exports.default = ImagesController;
