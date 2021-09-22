import { Request, Response } from 'express';
import * as fs from "fs";
import Path from "path";
import {stat} from "fs";

const DownloadController = {
    async downloadFile(req: Request, res: Response) {
        console.log(req.params[0])
        const filePath = Path.join(__dirname, `../../../files/upload/static/cache/${req.params[0]}`);
        fs.stat(filePath, ((err, stats) => {
            if (stats) {
                console.log(stats)
                try {
                    const file = fs.createReadStream(filePath)
                    if (file) {
                        // const filename = (new Date()).toISOString()
                        const filename = req.params[0]
                        // const filename = req.url.slice(req.url.lastIndexOf('/')+1, req.url.length)
                        res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
                        file.pipe(res)
                    }
                } catch (err) {
                    let e = err
                    e.path = req.params[0]
                    return res.status(500).send({ e });
                }
            }
            if (err) {
                let e = err
                e.path = req.params[0]
                return res.status(500).send({ e });
            }
        }))
    },
};

export default DownloadController;
