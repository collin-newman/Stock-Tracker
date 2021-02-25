import * as mongoose from 'mongoose';
import db from './index';
import * as bcrypt from 'bcrypt';
import * as express from 'express';

db;

interface IUserSchema extends mongoose.Document {
  username: string;
  hash: string;
};

interface IUser {
  username: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
});

const User = mongoose.model<IUserSchema>('User', userSchema);

export const create = (user: IUser, req: express.Request, res: express.Response) => {
  const { username, password } = user;
  const hashedPassword = bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ username, hash, })
        .then(() => res.send('Successful signup'))
        .catch(err => {
          console.log(err);
          res.send('Sorry that username is already taken');
        });
    })
    .catch(err => res.sendStatus(500));
};

export const login = (user: IUser, req: express.Request, res: express.Response) => {
  const { username, password } = user;
  interface UserResponse {
    _id: string;
    username: string;
    hash: string;
    _v: number;
  }
  User.find({ username, })
    .then((response) => {
      const { hash } = response;
      bcrypt.compare(password, hash)
        .then(() => res.send('login successful'))
        .catch(err => res.send('login failed'));
    })
    .catch(err => res.send('Invalid username'))
};