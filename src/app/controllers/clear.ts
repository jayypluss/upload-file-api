import { Request, Response } from 'express';
import * as fs from "fs";
import Path from "path";

const ClearCacheController = {
    async clearCache(req: Request, res: Response) {
        // directory path
        // const dir = '../../../files/upload/static/cache';
        const dir = Path.join(__dirname, '../../../files/upload/static/cache/');

        // delete directory recursively
        try {
            fs.rmdirSync(dir, { recursive: true });

            console.log(`${dir} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${dir}.`);
        }
    },
};

export default ClearCacheController;
