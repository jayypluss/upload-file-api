import { Request, Response } from 'express';
import {model} from "mongoose";


const ImageSchemaModel = model('Image')

const ImagesController = {
    async listAll(req: Request, res: Response) {
        const images = await ImageSchemaModel.find({}, '-file');

        return res.status(200).send(images);
    },
};

export default ImagesController;
