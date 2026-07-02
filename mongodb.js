const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

let database;

const connectDB = async () => {
    if (database) {
        return database;
    }

    try {
        const client = await MongoClient.connect(uri);

        database = client.db("contactsDB");

        console.log("Connected to MongoDB");

        return database;
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;