import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

const fix = async () => {
  dotenv.config();
  await connectDB();
  
  const email = 'test12345@gmail.com';
  
  // 1. Delete the corrupted user
  await User.deleteOne({ email });
  console.log('Deleted old corrupted user.');
  
  // 2. Create the user fresh
  const user = await User.create({
    name: 'TestUser',
    email,
    password: 'test12345'
  });
  console.log('Created fresh user with new hash:', user.password);
  
  // 3. Test the password match
  const isMatch = await user.matchPassword('test12345');
  console.log('Does password match? :', isMatch);

  process.exit(0);
};

fix().catch(err => {
  console.error(err);
  process.exit(1);
});
