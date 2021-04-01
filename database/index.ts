import mongoose from 'mongoose';
require('dotenv').config();

const uri = process.env.MONGO || 'mongodb://localhost/mvp';

const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo');
});

export default db;