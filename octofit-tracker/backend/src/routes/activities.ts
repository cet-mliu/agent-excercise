import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find();
  res.json(activities);
});

export default router;
