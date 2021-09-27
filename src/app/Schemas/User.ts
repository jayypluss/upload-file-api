// import { Schema, model } from 'mongoose'
// import * as bcrypt from 'bcrypt'
//
// // 1. Create an interface representing a document in MongoDB.
// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }
//
// // 2. Create a Schema corresponding to the document interface.
// const UserSchema = new Schema<User>({
//   username: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });
//
// userSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// userSchema.methods.comparePassword = function(candidatePassword) {
//   const user = this;
//
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }
//
//       if (!isMatch) {
//         return reject(false);
//       }
//
//       resolve(true);
//     });
//   });
// };
//
// model('User', userSchema);
