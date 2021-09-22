import { Request, Response } from 'express';
import * as fs from "fs";
import Path from "path";

const ListController = {
    async listAll(req: Request, res: Response) {
        // directory path
        // const dir = '../../../files/upload/static/cache';
        const dir = Path.join(__dirname, '../../../files/upload/static/cache/');

        // list all files in the directory
        fs.readdir(dir, (err, files) => {
            if (err) {
                if (err.code == 'ENOENT') return res.status(200).send({ message: 'No files in cache.' });
                return res.status(500).send({ err });
            }

            // files object contains all files names
            // log them on console
            files.forEach(file => {
                console.log(file);
            });
            if (files)
                return res.status(200).send({ files });
        });

    },
};

export default ListController;
