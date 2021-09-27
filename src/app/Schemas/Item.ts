import { Schema, model } from 'mongoose'

export const itemsSchema = new Schema({
  id: Schema.Types.ObjectId,
  categoryId: {
    type: String,
    ref: 'Category'
  },
  name: {
    type: String,
    unique: true
  },
  description: String,
  fileName: String,
  thumbFileName: String,
})

model('Item', itemsSchema)
