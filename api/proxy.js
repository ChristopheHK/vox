export default async function handler(req, res) {
    // Autoriser CORS pour tous les domaines
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Gérer les requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'URL parameter is required. Usage: /api/proxy?url=https://example.com' 
        });
    }
    
    try {
        console.log(`Fetching: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Retourner le HTML complet comme votre PHP
        const fullHtml = `<!DOCTYPE html><html>${html}</html>`;
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(fullHtml);
        
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch content',
            details: error.message,
            url: url
        });
    }
}
