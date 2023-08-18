import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utlis.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

// userRouter.post(
//   '/signin',
//   expressAsyncHadnler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       console.log('user not found');
//     } else {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         console.log('hug');
//         res.send({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send({ message: 'Invalid email or password' });
//   })
// );

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    // console.log(req.body.email);
    if (user) {
      if (req.body.password === user.password) {
        res.send({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

// userRouter.post(
//   '/reset-password',
//   expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
//       if (err) {
//         res.status(401).send({ message: 'Invalid Token' });
//       } else {
//         const user = await User.findOne({ resetToken: req.body.token });
//         if (user) {
//           if (req.body.password) {
//             user.password = bcrypt.hashSync(req.body.password, 8);
//             await user.save();
//             res.send({
//               message: 'Password reseted successfully',
//             });
//           }
//         } else {
//           res.status(404).send({ message: 'User not found' });
//         }
//       }
//     });
//   })
// );

export default userRouter;
