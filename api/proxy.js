export default async function handler(req, res) {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html>
            <head><title>Erreur - URL manquante</title></head>
            <body>
                <h1>Erreur 400</h1>
                <p>Paramètre 'url' requis.</p>
                <p>Usage: <code>?url=https://example.com</code></p>
            </body>
            </html>
        `);
    }
    
    try {
        console.log(`Fetching: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Reproduire exactement votre code PHP
        const finalHtml = `<!DOCTYPE html><html>${html}</html>`;
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL'); // Permettre l'iframe
        res.setHeader('Content-Security-Policy', 'frame-ancestors *'); // Permettre l'iframe
        
        return res.status(200).send(finalHtml);
        
    } catch (error) {
        console.error('Proxy error:', error);
        
        return res.status(500).send(`
            <!DOCTYPE html>
            <html>
            <head><title>Erreur de Proxy</title></head>
            <body>
                <h1>Erreur 500</h1>
                <p><strong>Impossible de charger:</strong> ${url}</p>
                <p><strong>Erreur:</strong> ${error.message}</p>
            </body>
            </html>
        `);
    }
}
