import { Request, Response } from 'express'
import {model} from "mongoose"
const ImageSchemaModel = model('Image')

const DownloadController = {
    async downloadFile(req: Request, res: Response) {
        const image = await ImageSchemaModel.findOne({ fileName: req.params[0] })

        // @ts-ignore
        if (!image || !image.file || !image.file.contentType || !image.file.data)
            res.status(500).send({ message: `Couldn't find image by the name of: ${req.params[0]}` })

        // @ts-ignore
        return res.status(200).type(image.file.contentType).send(image.file.data)
    },
}

export default DownloadController
