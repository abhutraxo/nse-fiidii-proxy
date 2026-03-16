export default async function handler(req, res) {
    // 1. Enable CORS for the dashboard
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1'
        };

        // 1. Hit the base URL to get cookies
        let initialRes = await fetch('https://www.nseindia.com', { headers });
        let setCookieHeader = initialRes.headers.get('set-cookie');
        
        let cookies = '';
        if (setCookieHeader) {
            const splitCookies = setCookieHeader.split(/,(?=\s*[a-zA-Z0-9_\-]+=\s*)/);
            cookies = splitCookies.map(c => c.split(';')[0]).join('; ');
        }
        
        // 2. Add specific API headers
        const apiHeaders = {
             ...headers,
            'Accept': '*/*',
            'Cookie': cookies,
            'Referer': 'https://www.nseindia.com/reports/fii-dii',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'X-Requested-With': 'XMLHttpRequest'
        };

        // 3. Fetch data
        const response = await fetch('https://www.nseindia.com/api/fiidiiTradeReact', {
            headers: apiHeaders
        });
        
        if (!response.ok) {
            throw new Error(`NSE returned status ${response.status}`);
        }

        const data = await response.json();
        
        // 4. Return data to frontend
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching data from NSE:', error.message);
        return res.status(500).json({ error: 'Failed to fetch data from NSE. They might be blocking the request.' });
    }
}
