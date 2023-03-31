import { MongoClient } from "mongodb";

// Should be loaded from a config file, **NOT** hard-coded here.
const MONGO_URI = "mongodb+srv://robinfintz:z7rITOGo3PY25vMw@cluster0.szon0.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "ParticiGator";
const COLLECTIONS = {
    Students: "Students",
}

export async function connectToDatabase() {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
        return;
    }
    
    const db = client.db(DATABASE_NAME);

    return {
        _rawClient: client,
        ParticiGator: db,
        Students: db.collection(COLLECTIONS.Students),
    };
}