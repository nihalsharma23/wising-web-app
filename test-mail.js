const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4jarZsUnoMMlGuEX8qvdXj7IAwxrNo5-SpROrQIGL01V3vBYYaxg44XMFneXSZ5Macg/exec';

async function testSignup() {
    console.log('Testing signup with JSON via POST...');
    const now = new Date();
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                email: 'test_mail_bot@wising.app',
                timestamp: now.toLocaleTimeString(),
                date: now.toLocaleDateString()
            })
        });
        const text = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Body:', text);
    } catch (error) {
        console.error('Error during fetch:', error);
    }
}

testSignup();
