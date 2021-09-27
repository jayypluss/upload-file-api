// import * as JWT from 'jsonwebtoken';
// import { Request, Response } from 'express';
//
// import * as dotenv from 'dotenv'
// import {model} from "mongoose";
// dotenv.config()
//
// const AuthController = {
//     async auth(req: Request, res: Response) {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(422).send({ error: 'Must provide email and password' });
//         }
//
//         const User = model<User>('User');
//
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(422).send({ error: 'Invalid password or email' });
//         }
//
//         if (!process.env.ACCESS_TOKEN_SECRET)
//             return res.status(500).send({ error: 'Couldn\'t authenticate user, contact your admin.'});
//
//         try {
//             await user.comparePassword(password);
//             const token = JWT.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!);
//             res.send({ token });
//         } catch (err) {
//             return res.status(422).send({ error: 'Invalid password or email' });
//         }
//     },
// };
//
// function generateAccessToken(key:string) {
//     return JWT.sign(key, JSON.stringify(process.env.ACCESS_TOKEN_SECRET))
// }
//
// export default AuthController;
