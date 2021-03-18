import * as mongoose from 'mongoose';
import db from './index';
import * as bcrypt from 'bcrypt';
import * as express from 'express';

interface IUserSchema extends mongoose.Document {
  username: string;
  hash: string;
  stocks: string[];
};

interface IUser {
  username: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  stocks: [String],
});

const User = mongoose.model<IUserSchema>('User', userSchema);

export const create = async (user: IUser) => {
  const { username, password } = user;
  try {
    const hash = await bcrypt.hash(password, 10);
    return User.create({ username, hash, stocks: [], })
    .then(() => true)
    .catch(err => {
      console.log('Invalid username/password combo', username, err);
      return false;
    });
  } catch (err) {
    return 'server error';
  }

};

export const login = async (user: IUser) => {
  const { username, password } = user;
  try {
    const response = await User.find({ username, });
    const { hash } = response[0];
    console.log(response);
    return bcrypt.compare(password, hash)
      .then((result) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.log('error comparing passwords');
        console.log(err);
        return 'server error';
      });
  } catch (err_1) {
    console.log('invalid username');
    console.log(err_1);
    return 'invalid username';
  }
};

export const addStock = async (stock: string, username: string) => {
  console.log(username, stock);
  try {
    const response = await User.findOneAndUpdate({ username, }, { $addToSet: { stocks: stock } }, { new: true });
    //response may be null and not throw an error
    if (response) {
      return response.stocks;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};