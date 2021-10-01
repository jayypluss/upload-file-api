"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchemaModel = mongoose_1.model('Item');
const CategoriesController = {
    async getAllItems(req, res) {
        const items = await ItemSchemaModel.find({});
        return res.status(200).send(items);
    },
    async editItem(req, res) {
        if (!req.body || (!req.body.categoryId && !req.body.name && !req.body.description && !req.body.fileName && !req.body.thumbFileName))
            return res.status(422).send({ message: 'Body needs at least categoryId, name, description, fileName or thumbFileName to be changed.' });
        const id = req.params.itemId;
        const item = req.body;
        console.log(item);
        let itemUpdateResponse = await ItemSchemaModel
            .updateOne({ _id: id }, {
            categoryId: item.categoryId,
            name: item.name,
            description: item.description,
            fileName: item.fileName,
            thumbFileName: item.thumbFileName
        });
        if (itemUpdateResponse.modifiedCount > 0)
            return res.status(200).send({ message: `Item updated suscessfully. `, itemId: id });
        else
            return res.status(500).send({ message: "Couldn't update Item.", updateResponse: itemUpdateResponse });
    },
    async deleteItem(req, res) {
        const id = req.params.itemId;
        const itemDeleteResponse = await ItemSchemaModel.deleteOne({ _id: id });
        if (itemDeleteResponse.deletedCount > 0)
            return res.status(200).send({ message: `Item deleted suscessfully.`, itemId: id });
        else
            return res.status(500).send({ message: "Couldn't delete item.", itemId: id, itemDeleteResponse });
    },
    async getCategoryItems(req, res) {
        var _a;
        const categoryId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.categoryId;
        const items = await ItemSchemaModel.find({ categoryId });
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
        console.log(req.params);
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
