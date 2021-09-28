import { Request, Response } from 'express';
import {Category} from "../Models/Category";
import {CategoryType} from "../Models/CategoryType";
import {model} from "mongoose";

const CategorySchemaModel = model('Category');

const DataController = {
    async getAllCategories(req: Request, res: Response) {

        const categories = await CategorySchemaModel.find({});

        return res.status(200).send(categories);
    },
    async createNewCategories(req: Request, res: Response) {
        if (!req.body || !req.body.length || req.body.length == 0)
            return res
                .status(422)
                .send({ error: 'No categories were added.'});

        const newCategories = req.body
        const newSavedCategories = []
        // console.log(newCategories)

        for (const newCategory of newCategories) {
            if (!newCategory.name || !newCategory.renderIndex) {
                return res
                    .status(422)
                    .send({ error: 'You must provide a name and locations (for item:)', newCategory});
            }

            try {
                const category = new CategorySchemaModel({
                    name: newCategory.name,
                    renderIndex: newCategory.renderIndex,
                    thumbFileName: newCategory.thumbFileName,
                    type: newCategory.type ?? CategoryType.ITEMS });

                newSavedCategories.push(await category.save());
            } catch (err) {
                res.status(422).send({ error: err.message });
            }
        }

        res.status(200).send(newSavedCategories);

    },
};

export default DataController;
