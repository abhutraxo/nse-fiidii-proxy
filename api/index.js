export default function handler(req, res) {
    res.status(200).send(`
        <html>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h2>NSE FII/DII Proxy is Running! ✅</h2>
                <p>The API endpoint is located at: <a href="/api/fiidii">/api/fiidii</a></p>
                <p>You can use this URL in your frontend dashboard.</p>
            </body>
        </html>
    `);
}
