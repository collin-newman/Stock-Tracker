import express from 'express';
import userRouter from './userRoutes';
import stockRouter from './stockRoutes';
import session = require('express-session');
import MongoStore = require('connect-mongo');
import { v4 as uuidV4 } from 'uuid';
import passport = require('passport');
require('dotenv').config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(session({
  genid: (req) => {
    console.log('new req with sessionid: ', req.sessionID);
    return uuidV4();
  },
  secret: String(process.env.SECRET),
  store: MongoStore.create({
    mongoUrl: process.env.MONGO || 'mongodb://localhost/mvp',
    ttl: 30, // = 14 * 24 * 60 * 60 14 days. Default
    autoRemove: 'native' // Default
  })
}));

app.use('/api/user', userRouter);
app.use('/api/stock', stockRouter);

app.use(express.static('dist'));

app.listen(port, () => {
  console.log('Listening on port ', port);
});
