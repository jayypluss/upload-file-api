"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryType_1 = require("../Models/CategoryType");
const mongoose_1 = require("mongoose");
const CategorySchemaModel = mongoose_1.model('Category');
const CategoriesController = {
    async getAllCategories(req, res) {
        const categories = await CategorySchemaModel.find({});
        return res.status(200).send(categories);
    },
    async editCategory(req, res) {
        if (!req.body || (!req.body.name && !req.body.renderIndex && !req.body.type && !req.body.thumbFileName))
            return res.status(422).send({ message: 'Body needs at least name, renderIndex, thumbFileName or type to be changed.' });
        const id = req.params.categoryId;
        const category = req.body;
        let categoryUpdateResponse = await CategorySchemaModel
            .updateOne({ _id: id }, {
            name: category.name,
            renderIndex: category.renderIndex,
            thumbFileName: category.thumbFileName,
            type: category.type
        });
        if (categoryUpdateResponse.modifiedCount > 0)
            return res.status(200).send({ message: `Category updated suscessfully. `, categoryId: id });
        else
            return res.status(500).send({ message: `Couldn't update Category.`, categoryId: id, categoryUpdateResponse });
    },
    async deleteCategory(req, res) {
        const id = req.params.categoryId;
        const categoryDeleteResponse = await CategorySchemaModel.deleteOne({ _id: id });
        if (categoryDeleteResponse.deletedCount > 0)
            return res.status(200).send({ message: `Category deleted suscessfully. `, categoryId: id, categoryDeleteResponse });
        else
            return res.status(500).send({ message: `Couldn't delete Category.`, categoryId: id, categoryDeleteResponse });
    },
    async createNewCategories(req, res) {
        var _a;
        let newCategories = req.body;
        if (newCategories.length == undefined)
            newCategories = [req.body];
        const newSavedCategories = [];
        if (!req.body || !newCategories.length || newCategories.length == 0)
            return res
                .status(422)
                .send({ message: 'No categories provided.' });
        for (const newCategory of newCategories) {
            if (!newCategory.name || !newCategory.renderIndex)
                return res.status(422)
                    .send({ message: 'You must provide a name and renderIndex (for:)', newCategory });
            try {
                const category = new CategorySchemaModel({
                    name: newCategory.name,
                    renderIndex: newCategory.renderIndex,
                    thumbFileName: newCategory.thumbFileName,
                    type: (_a = newCategory.type) !== null && _a !== void 0 ? _a : CategoryType_1.CategoryType.ITEMS
                });
                newSavedCategories.push(await category.save());
            }
            catch (err) {
                res.status(422).send({ error: err.message });
            }
        }
        res.status(200).send(newSavedCategories);
    },
};
exports.default = CategoriesController;
