import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const debug = async () => {
  await connectDB();
  const email = 'test12345@gmail.com';
  const plainPassword = 'test12345';

  const user = await User.findOne({ email });
  if (!user) {
    console.log(`User ${email} not found in DB.`);
    process.exit(0);
  }

  console.log('User found in DB:', user.email);
  console.log('Hashed Password in DB:', user.password);

  const isMatch = await bcrypt.compare(plainPassword, user.password);
  console.log(`bcrypt.compare('${plainPassword}', '${user.password}') =>`, isMatch);
  
  const matchPasswordResult = await user.matchPassword(plainPassword);
  console.log(`user.matchPassword('${plainPassword}') =>`, matchPasswordResult);

  process.exit(0);
};

debug().catch(console.error);
