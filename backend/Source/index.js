import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { connectToDatabase } from './Database';
import { buildUsersControllers } from './Controllers/Users';
import { buildQuestionsControllers } from './Controllers/Questions';
import { buildAdminControllers } from './Controllers/Admin';
import { buildStudentSubmissionsControllers } from './Controllers/StudentSubmissions';

// Set up express routes using controllers
async function main() {
  const app = express();
  app.use(cors()); // Allow all CORS requests.
  app.use(bodyParser.json()); // Parse JSON bodies.
  app.use(morgan('dev')); // Log HTTP requests.
  
  const databaseConnection = await connectToDatabase();
  const usersControllers = buildUsersControllers(databaseConnection);
  const questionsControllers = buildQuestionsControllers(databaseConnection);
  const adminControllers = buildAdminControllers(databaseConnection);
  const submissionsControllers = buildStudentSubmissionsControllers(databaseConnection);

  app.get('/users', usersControllers.getAll);
  app.get('/users/:instructor', usersControllers.getByInstructor);
  app.post('/users', usersControllers.create);
  app.put('/users/:id', usersControllers.update);
  app.delete('/users/:email', usersControllers.delete);

  app.get('/questions', questionsControllers.getAll);
  app.get('/questions/:instructor', questionsControllers.getByInstructor);
  app.post('/questions', questionsControllers.create);
  app.put('/questions/:id', questionsControllers.update);
  app.delete('/questions/:id', questionsControllers.delete);

  app.get('/admin', adminControllers.getAll);
  app.get('/admin/:email', adminControllers.getByEmail);
  app.post('/admin', adminControllers.create);
  app.post('/login', adminControllers.login);
  app.put('/admin/:email', adminControllers.update);
  app.delete('/admin/:email', adminControllers.delete);

  app.get('/submissions', submissionsControllers.getAll);
  app.get('/submissions/:instructor', submissionsControllers.getByInstructor);
  app.post('/submissions', submissionsControllers.create);
  app.put('/submissions/:id', submissionsControllers.update);
  app.delete('/submissions/:id', submissionsControllers.delete);
  
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
};

main();