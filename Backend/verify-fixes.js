import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:5005/api';

const runTests = async () => {
  console.log('--- Starting ReWear Fix Verification ---');

  const safeFetch = async (url, options) => {
    const res = await fetch(url, options);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      throw new Error(`Invalid JSON from ${url}: ${text}`);
    }
    if (!res.ok) throw new Error(data.message || 'API Error');
    return data;
  };

  try {
    const ts = Date.now();
    
    // 1. & 2. Register & Login
    console.log('[1/7] Registering new user...');
    const user = await safeFetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `User_${ts}`, email: `user_${ts}@test.com`, password: 'password123' })
    });
    console.log('✅ User registered & logged in:', user.token ? 'JWT Present' : 'FAILED');

    // 3. Upload Item (Without Cloudinary)
    if (!fs.existsSync('test_upload.jpg')) {
      fs.writeFileSync('test_upload.jpg', 'dummy image content');
    }
    
    console.log('[2/7] Testing Upload Item (Local Storage fallback)...');
    const formData = new FormData();
    formData.append('title', 'Delete Test Jacket');
    formData.append('description', 'This should be deleted');
    formData.append('category', 'Outerwear');
    formData.append('size', 'Large');
    formData.append('condition', 'Excellent');
    formData.append('image', new Blob([fs.readFileSync('test_upload.jpg')]), 'test_upload.jpg');

    const item = await safeFetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${user.token}` },
      body: formData
    });
    console.log('✅ Item created locally:', item.image);

    // 4. Verify in DB via GET
    console.log('[3/7] Fetching items to verify frontend visibility...');
    const items = await safeFetch(`${API_URL}/items`);
    const found = items.find(i => i._id === item._id);
    if (!found) throw new Error("Item not found in public feed");
    console.log('✅ Item is visible in public feed');

    // 5. Test Dashboard endpoints (Points & Sustainability)
    console.log('[4/7] Testing Dashboard dependencies...');
    const points = await safeFetch(`${API_URL}/users/points`, { headers: { 'Authorization': `Bearer ${user.token}` } });
    console.log('✅ Points API works. Balance:', points.points);

    // 6. Test My Exchanges API
    console.log('[5/7] Testing My Exchanges API...');
    const exchanges = await safeFetch(`${API_URL}/exchange`, { headers: { 'Authorization': `Bearer ${user.token}` } });
    console.log('✅ Exchanges API works. Incoming:', exchanges.incoming.length, 'Outgoing:', exchanges.outgoing.length);

    // 7. Delete Item
    console.log('[6/7] Testing Delete Item...');
    await safeFetch(`${API_URL}/items/${item._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    });
    console.log('✅ Delete API works');

    // 8. Verify deletion
    console.log('[7/7] Verifying Item Removed from DB...');
    const itemsAfter = await safeFetch(`${API_URL}/items`);
    const foundAfter = itemsAfter.find(i => i._id === item._id);
    if (foundAfter) throw new Error("Item still in DB after delete");
    console.log('✅ Item successfully removed from DB');

    console.log('--- ALL VERIFICATIONS PASSED SUCCESSFULLY ---');
    process.exit(0);

  } catch (err) {
    console.error('VERIFICATION FAILED:', err.message);
    process.exit(1);
  }
};

runTests();
