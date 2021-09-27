require("./app/Schemas/Category");
require("./app/Schemas/Item");
import 'dotenv/config';
import APP from './app';
import { connect } from 'mongoose'

const PORT = process.env.PORT || 9000;

const MONGO_URI: string = process.env.MONGO_URI || "mongodb+srv://admin:<password>@<url>/<database>?retryWrites=true&w=majority";

if (!MONGO_URI) {
    throw new Error(
        `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
}

connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    autoIndex: true,
    autoCreate: true,
}, (error) => {
    if (error) console.log('Error connecting to MONGO_DB: ', error)
    else console.log('Connected to MONGO_DB: ', MONGO_URI)
});

APP.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);
