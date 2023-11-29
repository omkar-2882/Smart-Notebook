const mongoose = require('mongoose');

const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB successfully');
    });
};

module.exports = connectToMongo;
