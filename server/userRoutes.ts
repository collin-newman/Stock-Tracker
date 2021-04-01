import express from 'express';
import * as User from '../database/userController';
import { findStockList } from '../database/stockController';
import passport = require('passport');
import bcrypt from 'bcrypt';
const LocalStrategy = require('passport-local').Strategy;

// Auth using Passport local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username: string, password: string, done: any) => {
    console.log('inside local strategy callback');

    interface iUser {
      _id: string;
      username: string;
      hash: string;
      _v: number;
      stocks: string[];
    };

    User.User.findOne({ username, }, (err: Error, user: iUser) => {

      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'That username does not exist.' });
      }
      console.log(user);
      console.log(password, user.hash);
      bcrypt.compare(password, user.hash, (err, result) => {
        if (err) {
          console.log(err, false, { message: 'Server error please try again.' });
          done(err);
        } else {
          if (result) {
            done(null, user);
          } else {
            done(null, false, { message: 'Incorrect username and password combo.' });
          }
        }
      });
    });
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.User.findById(id, (err: Error, user: any) => {
    done(err, user);
  });
});


// User routes

const userRouter: express.Router = express.Router();

userRouter.post('/signup', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const result = await User.create({ username, password });
  if (result) {
    if (result === 'server error') {
      res.status(500).send('server error');
    } else {
      passport.authenticate('local', (err, user, info) => {
        console.log('Auth completed');
        if (info) { return res.send(info.message); }
        if (err) { return res.status(500).send(); }
        // not sure whhow to properly redirect back to login page
        // since the front end is not setup for this yet
        // possible bug here
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
          if (err) { return res.status(500).send(); }
          return res.send("successful signup and login");
        });
      })(req, res);
    }
  } else {
    res.status(401).send('sorry that username is taken');
  }
});

userRouter.post('/login', (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  console.log('Login request');
  passport.authenticate('local', (err, user, info) => {
    console.log('Auth completed');
    if (info) { return res.send(info.message); }
    if (err) { return res.status(500).send(); }
    // not sure how to properly redirect back to login page
    // since the front end is not setup for this yet
    // possible bug here
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return res.status(500).send(); }
      return res.send("successful login");
    });
  })(req, res);
});

userRouter.get('/stocks', async (req: express.Request, res: express.Response) => {
});

userRouter.post('/addStock', async (req: express.Request, res: express.Response) => {
  const { username, stock } = req.body;
  const stocks = await User.addStock(stock, username);
  if (stocks) {
    const stockList = await findStockList(stocks);
    res.send(stockList);
  } else {
    res.status(500).send(`Error adding ${stock} to you watch list`);
  }
});

export default userRouter;