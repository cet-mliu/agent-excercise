import mongoose from 'mongoose';
import User from '../models/User';
import Activity from '../models/Activity';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Activity.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.com', team: 'Byte Busters' },
      { name: 'Alan Turing', email: 'alan@octofit.com', team: 'Byte Busters' },
    ]);

    await Activity.insertMany([
      { user: users[0].email, type: 'Running', durationMinutes: 30 },
      { user: users[1].email, type: 'Cycling', durationMinutes: 45 },
    ]);

    // TODO: Add seed data for teams, leaderboard, and workouts

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
