import { MongoClient } from "mongodb";

// Should be loaded from a config file, **NOT** hard-coded here.
// Replace MONGO_URI text with connection string to run back end
const MONGO_URI = "put connection string here";
const DATABASE_NAME = "ParticiGator";
const COLLECTIONS = {
    Students: "Students",
    Questions: "Questions",
    Admin: "Admin",
    StudentSubmissions: "StudentSubmissions",
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
        Questions: db.collection(COLLECTIONS.Questions),
        Admin: db.collection(COLLECTIONS.Admin),
        StudentSubmissions: db.collection(COLLECTIONS.StudentSubmissions),
    };
}