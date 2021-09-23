import { Request, Response } from 'express';
import Path from "path";
import FileSystem from 'fs'
import {Item} from "../Models/Item"; /* Put it where other modules included */

const DataController = {
    async getAllCategories(req: Request, res: Response) {
        const filePath = Path.join(__dirname, '../../../files/data/Categories.json');
        res.header("Content-Type",'application/json');
        return res.status(200).sendFile(filePath);
    },
    async getItems(req: Request, res: Response) {
        const filePath = Path.join(__dirname, '../../../files/data/Items.json');
        let data = JSON.parse(FileSystem.readFileSync(filePath, 'utf8')); /* Inside the get function */
        data = data.filter((item: Item) => item.categoryId.toString() == req.params.categoryId)
        // const json = JSON.stringify(data, null, 2)
        // res.header("Content-Type",'application/json');
        return res.status(200).send(data);
    },
};

export default DataController;
