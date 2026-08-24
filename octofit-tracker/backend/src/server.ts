import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import { PORT, API_BASE_URL } from './config/appConfig'; 
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(PORT, () => {
  console.log(`Octofit Tracker API running on port ${PORT}`);
  console.log(`API base URL: ${API_BASE_URL}`);
});
