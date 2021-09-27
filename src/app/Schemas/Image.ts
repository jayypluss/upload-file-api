import { Schema, model } from 'mongoose'

export const imageSchema = new Schema({
  id: Schema.Types.ObjectId,
  file: {
    data: Buffer,
    contentType: String
  },
  fileName: String
})

model('Image', imageSchema)
