import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const collection = db.collection('clothingitems');
  const items = await collection.find({}).toArray();
  console.log(JSON.stringify(items, null, 2));
  process.exit(0);
}

check();
