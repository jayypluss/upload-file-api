"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchemaModel = mongoose_1.model('Item');
const CategoriesController = {
    async getAllItems(req, res) {
        const items = await ItemSchemaModel.find({});
        return res.status(200).send(items);
    },
    async createNewItems(req, res) {
        var _a;
        if (!req.body || !req.body.length || req.body.length == 0)
            return res
                .status(422)
                .send({ error: 'No items were added.' });
        const newItems = req.body;
        const newSavedItems = [];
        // console.log(newCategories)
        for (const newItem of newItems) {
            if (!newItem.name || (!req.params[0] && !newItem.categoryId) || !newItem.description || !newItem.fileName) {
                return res
                    .status(422)
                    .send({ error: 'You must provide a name, categoryId, description and fileName (for item:)', newItem });
            }
            try {
                const item = new ItemSchemaModel({
                    name: newItem.name,
                    categoryId: (_a = req.params[0]) !== null && _a !== void 0 ? _a : newItem.categoryId,
                    description: newItem.description,
                    fileName: newItem.fileName,
                    thumbFileName: newItem.thumbFileName
                });
                newSavedItems.push(await item.save());
            }
            catch (err) {
                res.status(422).send({ error: err.message });
            }
        }
        res.status(200).send({ savedItems: newSavedItems, length: newSavedItems.length });
    },
};
exports.default = CategoriesController;
