// Simple API test script
// Run this with: node test-api.js

const API_BASE_URL = 'http://localhost:5000/api/v1';

async function testAPI() {
  console.log('Testing API connection...');
  console.log('API Base URL:', API_BASE_URL);
  
  try {
    // Test skills endpoint
    console.log('\n--- Testing Skills Endpoint ---');
    const skillsResponse = await fetch(`${API_BASE_URL}/skill`);
    console.log('Skills Status:', skillsResponse.status, skillsResponse.statusText);
    
    if (skillsResponse.ok) {
      const skillsText = await skillsResponse.text();
      console.log('Skills Response (first 200 chars):', skillsText.substring(0, 200));
      
      try {
        const skillsData = JSON.parse(skillsText);
        console.log('Skills Data Structure:', {
          statusCode: skillsData.statusCode,
          success: skillsData.success,
          message: skillsData.message,
          dataType: Array.isArray(skillsData.data) ? 'array' : typeof skillsData.data,
          dataLength: Array.isArray(skillsData.data) ? skillsData.data.length : 'N/A'
        });
        
        if (Array.isArray(skillsData.data) && skillsData.data.length > 0) {
          console.log('First skill:', skillsData.data[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse skills JSON:', parseError.message);
      }
    } else {
      const errorText = await skillsResponse.text();
      console.error('Skills Error Response:', errorText);
    }
    
    // Test about endpoint
    console.log('\n--- Testing About Endpoint ---');
    const aboutResponse = await fetch(`${API_BASE_URL}/about`);
    console.log('About Status:', aboutResponse.status, aboutResponse.statusText);
    
    if (aboutResponse.ok) {
      const aboutText = await aboutResponse.text();
      console.log('About Response (first 200 chars):', aboutText.substring(0, 200));
      
      try {
        const aboutData = JSON.parse(aboutText);
        console.log('About Data Structure:', {
          statusCode: aboutData.statusCode,
          success: aboutData.success,
          message: aboutData.message,
          dataType: typeof aboutData.data,
          dataKeys: aboutData.data ? Object.keys(aboutData.data) : 'N/A'
        });
      } catch (parseError) {
        console.error('Failed to parse about JSON:', parseError.message);
      }
    } else {
      const errorText = await aboutResponse.text();
      console.error('About Error Response:', errorText);
    }
    
  } catch (error) {
    console.error('Connection Error:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Backend server is not running on port 5000');
    console.log('2. CORS is not configured properly');
    console.log('3. API endpoints have changed');
    console.log('\nTo fix:');
    console.log('1. Start your backend server: npm run dev (in backend folder)');
    console.log('2. Check if http://localhost:5000/api/v1/skill works in browser');
  }
}

testAPI();