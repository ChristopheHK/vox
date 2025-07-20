// api/advanced-proxy.js
export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Referer': url
            }
        });
        
        let html = await response.text();
        
        // Injections pour contourner les protections Voxer
        const injectedScript = `
            <script>
                // Masquer que c'est dans un iframe
                try {
                    Object.defineProperty(window, 'top', {
                        get: function() { return window; }
                    });
                    Object.defineProperty(window, 'parent', {
                        get: function() { return window; }
                    });
                    
                    // Simuler les plugins manquants
                    Object.defineProperty(navigator, 'plugins', {
                        get: function() {
                            return {
                                'Shockwave Flash': { name: 'Shockwave Flash' },
                                length: 1
                            };
                        }
                    });
                    
                    // Modifier le domaine
                    Object.defineProperty(document, 'domain', {
                        get: function() { return 'voxer.com'; },
                        set: function() { return true; }
                    });
                    
                    // Remplacer window.location
                    const originalLocation = window.location.href;
                    Object.defineProperty(window, 'location', {
                        get: function() {
                            return {
                                href: '${url}',
                                protocol: 'https:',
                                host: 'voxer.com',
                                hostname: 'voxer.com',
                                pathname: '${new URL(url).pathname}',
                                search: '${new URL(url).search}',
                                origin: 'https://voxer.com'
                            };
                        }
                    });
                    
                    console.log('Voxer proxy injections applied');
                } catch (e) {
                    console.error('Injection error:', e);
                }
            </script>
        `;
        
        // Injecter au début du body
        html = html.replace(/<body[^>]*>/i, `$&${injectedScript}`);
        
        // Si pas de body, injecter dans head
        if (!html.includes('<body')) {
            html = html.replace(/<head[^>]*>/i, `$&${injectedScript}`);
        }
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *');
        
        res.send(`<!DOCTYPE html><html>${html}</html>`);
        
    } catch (error) {
        res.status(500).send('Erreur: ' + error.message);
    }
}
