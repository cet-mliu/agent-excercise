import { Schema, model } from 'mongoose';

export interface IActivity {
  user: string;
  type: string;
  durationMinutes: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model<IActivity>('Activity', activitySchema);
