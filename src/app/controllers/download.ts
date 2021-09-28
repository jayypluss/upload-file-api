import { Request, Response } from 'express'
import {model} from "mongoose"
const ImageSchemaModel = model('Image')

const DownloadController = {
    async downloadFile(req: Request, res: Response) {
        const image = await ImageSchemaModel.findOne({ fileName: req.params[0] })

        return res.status(200).type(image.file.contentType).send(image.file.data)
    },
}

export default DownloadController
