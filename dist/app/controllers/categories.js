"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryType_1 = require("../Models/CategoryType");
const mongoose_1 = require("mongoose");
const CategorySchemaModel = mongoose_1.model('Category');
const DataController = {
    async getAllCategories(req, res) {
        const categories = await CategorySchemaModel.find({});
        return res.status(200).send(categories);
    },
    async createNewCategories(req, res) {
        var _a;
        if (!req.body || !req.body.length || req.body.length == 0)
            return res
                .status(422)
                .send({ error: 'No categories were added.' });
        const newCategories = req.body;
        const newSavedCategories = [];
        // console.log(newCategories)
        for (const newCategory of newCategories) {
            if (!newCategory.name || !newCategory.renderIndex) {
                return res
                    .status(422)
                    .send({ error: 'You must provide a name and locations (for item:)', newCategory });
            }
            try {
                const category = new CategorySchemaModel({
                    name: newCategory.name,
                    renderIndex: newCategory.renderIndex,
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
exports.default = DataController;
