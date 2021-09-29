import { Request, Response } from 'express';
import {Category} from "../Models/Category";
import {CategoryType} from "../Models/CategoryType";
import {model} from "mongoose";

const CategorySchemaModel = model('Category');

const CategoriesController = {
    async getAllCategories(req: Request, res: Response) {
        const categories = await CategorySchemaModel.find({});

        return res.status(200).send(categories);
    },
    async editCategory(req: Request, res: Response) {
        if (!req.body || (!req.body.name && !req.body.renderIndex && !req.body.type && !req.body.thumbFileName))
            return res.status(422).send({ message: 'Body needs at least name, renderIndex, thumbFileName or type to be changed.' });

        const id = req.params.categoryId
        const category: Category = req.body

        let categoryUpdateResponse = await CategorySchemaModel
            .updateOne({ _id: id },
                {
                    name: category.name,
                    renderIndex: category.renderIndex,
                    thumbFileName: category.thumbFileName,
                    type: category.type
                })

        if (categoryUpdateResponse.modifiedCount > 0)
            return res.status(200).send({ message: `Category updated suscessfully. `, categoryId: id })
        else
            return res.status(500).send({ message: `Couldn't update Category.`, categoryId: id, categoryUpdateResponse })
    },
    async deleteCategory(req: Request, res: Response) {
        const id = req.params.categoryId
        const categoryDeleteResponse = await CategorySchemaModel.deleteOne({ _id: id });

        if (categoryDeleteResponse.deletedCount > 0)
            return res.status(200).send(categoryDeleteResponse)
        else
            return res.status(500).send({ message: `Couldn't delete category ${id}.`, deleteResponse: categoryDeleteResponse })
    },
    async createNewCategories(req: Request, res: Response) {
        let newCategories = req.body
        if (newCategories.length == undefined) newCategories = [req.body]
        const newSavedCategories = []

        if (!req.body || !newCategories.length || newCategories.length == 0)
            return res
                .status(422)
                .send({ message: 'No categories provided.' });

        for (const newCategory of newCategories) {
            if (!newCategory.name || !newCategory.renderIndex)
                return res.status(422)
                    .send({ message: 'You must provide a name and renderIndex (for:)', newCategory});


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

export default CategoriesController;
