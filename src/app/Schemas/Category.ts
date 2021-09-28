import { Schema, model } from 'mongoose'
import {itemsSchema} from "./Item";

const categorySchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true
  },
  renderIndex: Number,
  thumbFileName: String,
  items: [itemsSchema],
  type: String,
},  {
  writeConcern: {
    j: true,
    wtimeout: 1000
  }
})

model('Category', categorySchema)
