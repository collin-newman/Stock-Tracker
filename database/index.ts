import * as mongoose from 'mongoose';

const uri = process.env.MONGOURI || 'mongodb://localhost/mvp';
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo');
});

export default db;