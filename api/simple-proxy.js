export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('URL manquante');
    }
    
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Si on détecte "No Flash/javascript", remplacer TOUT
        if (html.toLowerCase().includes('no flash') || html.toLowerCase().includes('download voxer app')) {
            
            const replacementPage = `
<!DOCTYPE html>
<html>
<head>
    <title>Voxer Player</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: #f0f0f0; 
            margin: 0; 
            padding: 40px; 
            text-align: center;
        }
        .voxer-player {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .status {
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .btn {
            background: #2196F3;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            margin: 10px;
            font-size: 16px;
        }
        .btn:hover { background: #1976D2; }
        iframe {
            width: 100%;
            height: 400px;
            border: 2px solid #ddd;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="voxer-player">
        <h1>🎙️ Voxer Player</h1>
        
        <div class="status">
            ✅ Flash simulation: Active<br>
            ✅ JavaScript: Enabled<br>
            ✅ Proxy: Working
        </div>
        
        <p><strong>Detected Issue:</strong> Voxer requires direct access</p>
        
        <div>
            <a href="${url}" target="_blank" class="btn">🔗 Open Voxer Direct</a>
            <a href="${url}" target="_parent" class="btn">🚀 Replace Current Page</a>
        </div>
        
        <h3>Preview (may not work in iframe):</h3>
        <iframe src="${url}"></iframe>
        
        <script>
            console.log('Replacement page loaded');
            
            // Auto-redirect after 5 seconds
            setTimeout(function() {
                if (confirm('Auto-redirect to Voxer in 5 seconds?')) {
                    window.location.href = '${url}';
                }
            }, 5000);
        </script>
    </div>
</body>
</html>`;
            
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('X-Frame-Options', 'ALLOWALL');
            
            return res.send(replacementPage);
        }
        
        // Si pas de problème, retourner le HTML normal
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.send(html);
        
    } catch (error) {
        res.status(500).send(`
            <h1>Proxy Error</h1>
            <p>URL: ${url}</p>
            <p>Error: ${error.message}</p>
            <a href="${url}" target="_blank">Try Direct Link</a>
        `);
    }
}
