import { Schema, model } from 'mongoose'
import {itemsSchema} from "./Item";

const categorySchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true
  },
  renderIndex: Number,
  items: [itemsSchema],
  type: String,
})

model('Category', categorySchema)
