import * as mongoose from 'mongoose';
// const connection = mongoose.connect(`mongodb://${process.env.DB || 'localhost:27017'}/mvp`, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connect(`mongodb://localhost:27017/mvp`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo');
});

export default db;