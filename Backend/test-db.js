import connectDB from './config/db.js';
import User from './models/User.js';

await connectDB();
const user = await User.findOne({ email: 'rishabh2@gmail.com' });
console.log('Password hash:', user.password);
process.exit(0);
