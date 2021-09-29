import { Request, Response } from 'express';
import {model} from "mongoose";
import {Category} from "../Models/Category";


const ImageSchemaModel = model('Image')

const ImagesController = {
    async listAll(req: Request, res: Response) {
        const images = await ImageSchemaModel.find({}, '-file');

        return res.status(200).send(images);
    },
    async deleteImage(req: Request, res: Response) {
        const id = req.params.imageId
        const imageDeleteResponse = await ImageSchemaModel.deleteOne({ _id: id });

        if (imageDeleteResponse.deletedCount > 0)
            return res.status(200).send({ message: `Image deleted suscessfully. `, imageId: id, imageDeleteResponse })
        else
            return res.status(500).send({ message: `Couldn't delete Image.`, imageId: id, imageDeleteResponse })
    },
};

export default ImagesController;
