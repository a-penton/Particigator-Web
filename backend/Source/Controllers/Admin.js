export function buildAdminControllers(databaseConnection) {
    const db = databaseConnection;
    
    return {
      getAll: async (req, res) => {
        const documents = await db.Admin.find({}).toArray()
        return res.send(documents);
      },
      getById: async (req, res) => {
        const id = req.params.id;
        const documents = await db.Admin.findOne({ id });
        if (documents === null) {
          return res.status(404).send('User not found');
        }
        return res.send(documents);
      },
      create: async (req, res) => {
        await db.Admin.insertOne(req.body);
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