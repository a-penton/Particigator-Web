import bcrypt from 'bcrypt';
//import jwt from 'jwt';

export function buildAdminControllers(databaseConnection) {
    const db = databaseConnection;
    
    return {
      getAll: async (req, res) => {
        const documents = await db.Admin.find({}).toArray()
        return res.send(documents);
      },
      getByEmail: async (req, res) => {
        const email = req.params.email;
        const documents = await db.Admin.findOne({ email });
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
        const email = req.params.email;
        await db.Admin.deleteOne({ email });
        return res.sendStatus(200);
      },
      login: async (req, res) => {
        const { email, password } = req.body.params;
        let match = false;

        try {
          console.log(req.body);
          const user = await db.Admin.findOne({ email });
          console.log(user);
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
          console.log(password)
          console.log(user.password)
          //const match = await bcrypt.compare(password, user.password);
          match = password === user.password;
          console.log(match);
          if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // const token = 'whoops';//jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          // res.json({ token });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Server error' });
        }
        console.log('Matched');
        return res.status(200).json({ message: 'Correct!' });
      }
    }
  }