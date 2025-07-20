export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'Referer': 'https://voxer.com/',
                'Origin': 'https://voxer.com'
            }
        });
        
        let html = await response.text();
        
        // Injecter du JavaScript pour contourner les restrictions Voxer
        const voxerHacks = `
            <script>
                console.log('Voxer proxy hacks loading...');
                
                // 1. Masquer qu'on est dans un iframe
                try {
                    Object.defineProperty(window, 'top', {
                        get: function() { return window; },
                        configurable: false
                    });
                    Object.defineProperty(window, 'parent', {
                        get: function() { return window; },
                        configurable: false
                    });
                    Object.defineProperty(window, 'frameElement', {
                        get: function() { return null; },
                        configurable: false
                    });
                } catch(e) { console.log('iframe masking failed:', e); }
                
                // 2. Simuler Flash Player
                try {
                    if (!navigator.plugins) navigator.plugins = {};
                    navigator.plugins['Shockwave Flash'] = {
                        name: 'Shockwave Flash',
                        filename: 'flashplayer.xpi',
                        version: '32.0.0.465',
                        length: 1
                    };
                    
                    // Flash detection alternative
                    window.swfobject = {
                        hasFlashPlayerVersion: function() { return true; },
                        getFlashPlayerVersion: function() { return {major: 32, minor: 0, release: 0}; }
                    };
                } catch(e) { console.log('Flash simulation failed:', e); }
                
                // 3. Domaine et location
                try {
                    Object.defineProperty(document, 'domain', {
                        get: function() { return 'web.voxer.com'; },
                        set: function(val) { return val; },
                        configurable: false
                    });
                    
                    Object.defineProperty(window, 'location', {
                        get: function() {
                            return {
                                href: '${url}',
                                protocol: 'https:',
                                host: 'web.voxer.com',
                                hostname: 'web.voxer.com',
                                pathname: window.location.pathname,
                                search: window.location.search,
                                origin: 'https://web.voxer.com',
                                toString: function() { return '${url}'; }
                            };
                        },
                        configurable: false
                    });
                } catch(e) { console.log('Location override failed:', e); }
                
                // 4. Empêcher les redirections
                const originalReplace = window.location.replace;
                const originalAssign = window.location.assign;
                window.location.replace = function(url) { 
                    console.log('Blocked redirect to:', url); 
                };
                window.location.assign = function(url) { 
                    console.log('Blocked navigation to:', url); 
                };
                
                // 5. Override console pour débugger
                const originalLog = console.log;
                console.log = function(...args) {
                    originalLog('[VOXER-PROXY]', ...args);
                };
                
                console.log('Voxer proxy hacks applied successfully');
                
                // 6. Forcer le chargement après 2 secondes
                setTimeout(function() {
                    if (document.body && document.body.innerHTML.length < 500) {
                        document.body.innerHTML += '<div style="padding:20px;background:#f0f0f0;"><h2>Chargement en cours...</h2><p>Si la page ne se charge pas, Voxer peut utiliser des protections contre l\\'embedding.</p></div>';
                    }
                }, 2000);
            </script>
        `;
        
        // Injecter le script au début
        html = html.replace(/<head[^>]*>/i, `$&${voxerHacks}`);
        
        // Si pas de head, l'ajouter
        if (!html.includes('<head')) {
            html = html.replace(/<html[^>]*>/i, `$&<head>${voxerHacks}</head>`);
        }
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *');
        
        res.send(`<!DOCTYPE html><html>${html}</html>`);
        
    } catch (error) {
        res.status(500).send(`Erreur: ${error.message}`);
    }
}
