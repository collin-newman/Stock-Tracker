import * as mongoose from 'mongoose';
import db from './index';


interface iSessionSchema extends mongoose.Document {
  sessionId: string;
  userId: number;
};

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: Number, required: true }
});

const Session = mongoose.model<iSessionSchema>('Session', sessionSchema);

export const createSession = async (userId: string) => {
  try {
    const session = await Session.create({ userId, });
    if (session) {
      return session;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const findSession = async (sessionId: string) => {
  try {
    const session = await Session.find({ sessionId, });
    if (session) {
      return session;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};