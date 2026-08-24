import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  team?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: String },
});

export default model<IUser>('User', userSchema);
