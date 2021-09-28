import { Request, Response } from 'express';
import {Item} from "../Models/Item";
import {model} from "mongoose";

const ItemSchemaModel = model('Item')

const CategoriesController = {
    async getAllItems(req: Request, res: Response) {
        const items = await ItemSchemaModel.find({});

        return res.status(200).send(items);
    },
    async getCategoryItems(req: Request, res: Response) {
        const categoryId = req.params[0]
        const items = await ItemSchemaModel.find({ categoryId });

        return res.status(200).send(items);
    },
    async createNewItems(req: Request, res: Response) {
        if (!req.body || !req.body.length || req.body.length == 0)
            return res
                .status(422)
                .send({ error: 'No items were added.'});

        const newItems: Item[] = req.body
        const newSavedItems = []
        console.log(req.params)

        for (const newItem of newItems) {
            if (!newItem.name || (!req.params[0] && !newItem.categoryId) || !newItem.description || !newItem.fileName) {
                return res
                    .status(422)
                    .send({ error: 'You must provide a name, categoryId, description and fileName (for item:)', newItem});
            }

            try {
                const item = new ItemSchemaModel({
                    name: newItem.name,
                    categoryId: req.params[0] ?? newItem.categoryId,
                    description: newItem.description,
                    fileName: newItem.fileName,
                    thumbFileName: newItem.thumbFileName
                });

                newSavedItems.push(await item.save());
            } catch (err) {
                res.status(422).send({ error: err.message });
            }
        }

        res.status(200).send({ savedItems: newSavedItems, length: newSavedItems.length });

    },
};

export default CategoriesController;
