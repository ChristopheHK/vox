// Version simplifiée si les autres ne marchent pas
export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; VoxerProxy/1.0)',
                'Accept': '*/*',
                'Referer': url
            }
        });
        
        const content = await response.text();
        const contentType = response.headers.get('content-type') || 'text/html';
        
        res.setHeader('Content-Type', contentType);
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        
        // Pour Voxer spécifiquement, injecter du JavaScript pour contourner les vérifications
        if (contentType.includes('text/html')) {
            const enhanced = content.replace(
                '<head>',
                `<head>
                <script>
                    // Simuler Flash/JavaScript disponible
                    window.navigator.plugins = window.navigator.plugins || [];
                    window.navigator.plugins['Shockwave Flash'] = true;
                    
                    // Contourner les vérifications de domaine
                    Object.defineProperty(document, 'domain', {
                        value: 'voxer.com',
                        writable: false
                    });
                </script>`
            );
            return res.send(enhanced);
        }
        
        res.send(content);
    } catch (error) {
        res.status(500).send('Erreur: ' + error.message);
    }
}
