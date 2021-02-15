import * as mongoose from 'mongoose';
const connection = mongoose.connect(`mongodb://${process.env.DB || 'localhost:27017'}/mvp`, { useNewUrlParser: true, useUnifiedTopology: true });

export default connection;