// Function to enable CRUD operations with Users (Students) database
export function buildUsersControllers(databaseConnection) {
  const db = databaseConnection;
  
  return {
    getAll: async (req, res) => {
      const documents = await db.Students.find({}).toArray()
      return res.send(documents);
    },
    getById: async (req, res) => {
      const id = req.params.id;
      const documents = await db.Students.findOne({ id });
      if (documents === null) {
        return res.status(404).send('User not found');
      }
      return res.send(documents);
    },
    getByInstructor: async (req, res) => {
      const instructor = req.params.instructor;
      const documents = await db.Students.find({ instructor: instructor }).toArray();
      if (documents === null || documents.length === 0) {
        return res.status(404).send('Users not found');
      }
      else {
        return res.status(201).send(documents);
      }
    },
    create: async (req, res) => {
      const id = req.body.student.id;
      const instructor = req.body.student.instructor;
      const reqMod = {id: id, instructor: instructor};
      const documents = await db.Students.findOne({id});
      if(documents === null){
        await db.Students.insertOne(reqMod);
        return res.sendStatus(201);
      }
      else {
        return res.sendStatus(300);
      }
    },
    update: async (req, res) => {
      return res.sendStatus(501)
    },
    delete: async (req, res) => {
      const instructor = req.params.email;
      const documents = await db.Students.findOne({instructor: instructor});
      if (documents !== null) {
        await db.Students.deleteMany({instructor: instructor});
        return res.sendStatus(201);
      }
      else {
        return res.status(404).send("Could not delete students");
      }

    }
  }
}