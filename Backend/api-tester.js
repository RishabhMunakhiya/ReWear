import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:5000/api';
const testUser = {
  name: 'AutoTester',
  email: `test${Date.now()}@example.com`,
  password: 'password123'
};

async function runTests() {
  console.log('--- STARTING BACKEND API TESTS ---');
  let token = '';
  
  try {
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const regData = await regRes.json();
    token = regData.token;

    console.log('\nTesting Login...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    const loginData = await loginRes.json();
    if (loginRes.ok) {
      console.log('✅ Login successful');
    } else {
      console.error('❌ Login failed:', loginData);
    }
    process.exit(0);

  } catch (error) {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  }
}

runTests();
