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
        console.log(req.body.data.email);
        const email = req.body.data.email;
        const user = await db.Admin.findOne({ email });
        if (user == null) {
          console.log("User cleared");
          //console.log(req.body.data);
          await db.Admin.insertOne(req.body.data);
          return res.sendStatus(201);
        }
        return res.status(401).json({ message: 'An existing user already has that email. Please use a different email or sign in.' });
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
          const user = await db.Admin.findOne({ email });
          if (user == null) {
            return res.status(401).json({ message: 'Could not find user with that email. Please sign up.' });
          }
          //const match = await bcrypt.compare(password, user.password);
          match = password === user.password;
          if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          // res.json({ token });
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json({ message: 'Correct' });
      }
    }
  }