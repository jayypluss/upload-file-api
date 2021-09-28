import { Schema, model } from 'mongoose'

export const imageSchema = new Schema({
  id: Schema.Types.ObjectId,
  file: {
    data: Buffer,
    contentType: String
  },
  fileName: String
},  {
  writeConcern: {
    j: true,
    wtimeout: 1000
  }
})

model('Image', imageSchema)
