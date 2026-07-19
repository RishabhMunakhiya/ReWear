import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:5005/api';

const runTests = async () => {
  console.log('--- Starting Backend Verification ---');

  // Helper to safely parse JSON
  const safeFetch = async (url, options) => {
    const res = await fetch(url, options);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      console.log(`Failed to parse JSON from ${url}:`, text);
      throw e;
    }
    if (!res.ok) throw new Error(data.message || 'API Error');
    return data;
  };

  try {
    // 1. Create Users
    console.log('[1/10] Registering User A...');
    const userA = await safeFetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User A', email: `usera_${Date.now()}@test.com`, password: 'password123' })
    });
    
    console.log('[2/10] Registering User B...');
    const userB = await safeFetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User B', email: `userb_${Date.now()}@test.com`, password: 'password123' })
    });

    // 2. Get User Profile
    console.log('[3/10] Testing Get User Profile API...');
    const profileA = await safeFetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${userA.token}` }
    });
    if (!profileA.email) throw new Error("Profile API failed to return email");

    // Create dummy image for upload
    if (!fs.existsSync('test.jpg')) {
      fs.writeFileSync('test.jpg', 'dummy image content');
    }

    // 3. Create Clothing Item API (User A)
    console.log('[4/10] Testing Create Clothing Item API (User A)...');
    const formDataA = new FormData();
    formDataA.append('title', 'Test Jacket');
    formDataA.append('description', 'A very nice test jacket');
    formDataA.append('category', 'Outerwear');
    formDataA.append('size', 'Large');
    formDataA.append('condition', 'Excellent');
    formDataA.append('image', new Blob([fs.readFileSync('test.jpg')]), 'test.jpg');

    const itemA = await safeFetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userA.token}` },
      body: formDataA
    });

    // 4. Create Clothing Item API (User B)
    console.log('[5/10] Testing Create Clothing Item API (User B)...');
    const formDataB = new FormData();
    formDataB.append('title', 'Test Hoodie');
    formDataB.append('description', 'A cozy test hoodie');
    formDataB.append('category', 'Streetwear');
    formDataB.append('size', 'Medium');
    formDataB.append('condition', 'Good');
    formDataB.append('image', new Blob([fs.readFileSync('test.jpg')]), 'test.jpg');

    const itemB = await safeFetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userB.token}` },
      body: formDataB
    });

    // 5. Get Clothing Items API
    console.log('[6/10] Testing Get Clothing Items API...');
    const items = await safeFetch(`${API_URL}/items`);
    if (!Array.isArray(items) || items.length < 2) throw new Error("Get Items returned insufficient items");

    // 6. Exchange Request API
    console.log('[7/10] Testing Exchange Request API...');
    const exchangeRequest = await safeFetch(`${API_URL}/exchange/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userA.token}` },
      body: JSON.stringify({ itemId: itemB._id, offeredItemId: itemA._id })
    });

    // 7. Accept Exchange API
    console.log('[8/10] Testing Accept Exchange API (User B)...');
    await safeFetch(`${API_URL}/exchange/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userB.token}` },
      body: JSON.stringify({ requestId: exchangeRequest._id })
    });

    // 8. Complete Exchange API
    console.log('[9/10] Testing Complete Exchange API (User A)...');
    await safeFetch(`${API_URL}/exchange/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userA.token}` },
      body: JSON.stringify({ requestId: exchangeRequest._id })
    });

    // 9. Sustainability Records API
    console.log('[10/10] Testing Sustainability Records API...');
    const sustainability = await safeFetch(`${API_URL}/users/sustainability`, {
      headers: { 'Authorization': `Bearer ${userA.token}` }
    });
    
    if (sustainability.carbonSaved === 0) throw new Error("Sustainability tracking failed to increment");

    console.log('--- Verification Complete! All APIs Working Perfectly ---');
    process.exit(0);
  } catch (error) {
    console.error('VERIFICATION FAILED:', error.message);
    process.exit(1);
  }
};

runTests();
