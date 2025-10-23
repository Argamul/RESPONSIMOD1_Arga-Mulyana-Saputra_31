/**
 * Simple API testing script
 * Run with: node test-api.js
 */

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Shoe Laundry API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData.message);
    console.log('');

    // Test 2: Get All Items
    console.log('2. Testing Get All Items...');
    const allItemsResponse = await fetch(`${API_BASE_URL}/api/items`);
    const allItemsData = await allItemsResponse.json();
    console.log('✅ All Items:', allItemsData.count, 'items found');
    console.log('');

    // Test 3: Create New Item
    console.log('3. Testing Create New Item...');
    const newItem = {
      customer_name: 'Test Customer',
      shoe_type: 'Test Shoe Brand',
      status: 'Pending'
    };

    const createResponse = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    const createData = await createResponse.json();
    console.log('✅ Created Item:', createData.data?.id);
    const itemId = createData.data?.id;
    console.log('');

    if (itemId) {
      // Test 4: Get Single Item
      console.log('4. Testing Get Single Item...');
      const singleItemResponse = await fetch(`${API_BASE_URL}/api/items/${itemId}`);
      const singleItemData = await singleItemResponse.json();
      console.log('✅ Single Item:', singleItemData.data?.customer_name);
      console.log('');

      // Test 5: Update Item
      console.log('5. Testing Update Item...');
      const updateData = {
        status: 'In Progress'
      };

      const updateResponse = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const updateResult = await updateResponse.json();
      console.log('✅ Updated Item Status:', updateResult.data?.status);
      console.log('');

      // Test 6: Filter by Status
      console.log('6. Testing Filter by Status...');
      const filterResponse = await fetch(`${API_BASE_URL}/api/items?status=In Progress`);
      const filterData = await filterResponse.json();
      console.log('✅ Filtered Items:', filterData.count, 'items with status "In Progress"');
      console.log('');

      // Test 7: Delete Item
      console.log('7. Testing Delete Item...');
      const deleteResponse = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
        method: 'DELETE'
      });

      const deleteData = await deleteResponse.json();
      console.log('✅ Deleted Item:', deleteData.message);
      console.log('');
    }

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Make sure the API server is running on', API_BASE_URL);
  }
}

// Run the tests
testAPI();
