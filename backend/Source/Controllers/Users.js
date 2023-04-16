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
    create: async (req, res) => {
      //console.log(req.body.student);
      const id = req.body.student.id;
      const instructor = req.body.student.instructor;
      const reqMod = {id: id, instructor: instructor};
      console.log(reqMod)
      const documents = await db.Students.findOne({ id });
      if (documents === null && id !== "") {
        await db.Students.insertOne(reqMod);
        return res.sendStatus(201);
      }
      else {
        return res.status(404).send("Student with id " + documents + " already in system");
      }
    },
    update: async (req, res) => {
      return res.sendStatus(501)
    },
    delete: async (req, res) => {
      const instructor = req.params.email;
      console.log(req.params.email);
      const documents = await db.Students.findOne({instructor: instructor});
      if (documents !== null) {
        await db.Students.deleteMany({instructor: instructor});
        console.log("hello");
        return res.sendStatus(201);
      }
      else {
        return res.status(404).send("Could not delete students");
      }

    }
  }
}