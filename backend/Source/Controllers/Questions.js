// Function to enable CRUD operations with Questions database
export function buildQuestionsControllers(databaseConnection) {
    const db = databaseConnection;
    
    return {
      getAll: async (req, res) => {
        const documents = await db.Questions.find({}).toArray()
        return res.send(documents);
      },
      getByInstructor: async (req, res) => {
        const instructor = req.params.instructor;
        const documents = await db.Questions.find({ instructor: instructor }).toArray();
        if (documents === null || documents.length === 0) {
          return res.status(404).send('Users not found');
        }
        else {
          return res.status(201).send(documents);
        }
      },
      create: async (req, res) => {
        await db.Questions.insertOne(req.body);
        return res.sendStatus(201);
      },
      update: async (req, res) => {
        return res.sendStatus(501)
      },
      delete: async (req, res) => {
        const id = req.params.id;
        await collection.deleteOne({ id });
        return res.sendStatus(200);
      }
    }
  }