"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./app/Schemas/Category");
require("./app/Schemas/Item");
require("./app/Schemas/Image");
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = require("mongoose");
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:<password>@<url>/<database>?retryWrites=true&w=majority";
if (!MONGO_URI) {
    throw new Error(`MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`);
}
mongoose_1.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    autoIndex: true,
    autoCreate: true,
}, (error) => {
    if (error)
        console.log('Error connecting to MONGO_DB: ', error);
    else
        console.log('Connected to MONGO_DB: ', MONGO_URI);
});
app_1.default.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
