const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rahul:mgpX7ouL0Y5a9CRj@adpotly.ur1ugjn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");
        return client.db("adoptly");
    } catch (error) {
        console.error("❌ Could not connect to MongoDB", error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase };