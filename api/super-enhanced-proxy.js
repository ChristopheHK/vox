export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('URL manquante');
    }
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://web.voxer.com/',
                'Origin': 'https://web.voxer.com'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        let html = await response.text();
        
        // Script simplifié et sécurisé
        const hackScript = `
<script>
console.log('Voxer proxy loading...');

// Flash simulation
try {
    if (!navigator.plugins) navigator.plugins = {};
    navigator.plugins['Shockwave Flash'] = {
        name: 'Shockwave Flash',
        version: '32.0.0.465'
    };
    
    window.swfobject = {
        hasFlashPlayerVersion: function() { return true; },
        getFlashPlayerVersion: function() { return {major: 32, minor: 0}; }
    };
    
    console.log('Flash simulation OK');
} catch(e) {
    console.log('Flash simulation failed:', e);
}

// Auto-click avec timing sécurisé
function safeAutoClick() {
    try {
        var bodyText = document.body.textContent.toLowerCase();
        
        // Éviter la page de download
        if (bodyText.indexOf('download voxer app') >= 0) {
            console.log('Download page detected, waiting...');
            setTimeout(safeAutoClick, 3000);
            return;
        }
        
        // Chercher le bouton direct link
        var directButtons = document.querySelectorAll('a, button');
        var clicked = false;
        
        for (var i = 0; i < directButtons.length; i++) {
            var btn = directButtons[i];
            var text = (btn.textContent || '').toLowerCase();
            var href = (btn.href || '').toLowerCase();
            
            if ((text.indexOf('open direct') >= 0 || text.indexOf('direct link') >= 0) &&
                text.indexOf('download') < 0 &&
                href.indexOf('download') < 0) {
                
                console.log('Auto-clicking:', text);
                btn.click();
                clicked = true;
                break;
            }
        }
        
        if (!clicked) {
            console.log('No direct button found, trying iframe fallback...');
            setTimeout(function() {
                if (bodyText.indexOf('flash simulation active') >= 0) {
                    replaceWithIframe();
                }
            }, 5000);
        }
        
    } catch(e) {
        console.log('Auto-click error:', e);
    }
}

function replaceWithIframe() {
    try {
        document.body.innerHTML = '<style>body{margin:0;padding:0;overflow:hidden;}</style>' +
            '<div style="position:fixed;top:10px;left:10px;background:#4CAF50;color:white;padding:8px 15px;border-radius:15px;font-size:11px;z-index:9999;">Direct Access</div>' +
            '<iframe src="${url}" style="width:100vw;height:100vh;border:none;"></iframe>';
    } catch(e) {
        console.log('Iframe replacement failed:', e);
    }
}

// Démarrer après chargement DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(safeAutoClick, 4000);
    });
} else {
    setTimeout(safeAutoClick, 4000);
}

console.log('Voxer proxy script loaded');
</script>`;

        // Injecter le script au début du HTML
        if (html.indexOf('<head') >= 0) {
            html = html.replace(/<head[^>]*>/i, '$&' + hackScript);
        } else if (html.indexOf('<body') >= 0) {
            html = html.replace(/<body[^>]*>/i, '$&' + hackScript);
        } else {
            html = hackScript + html;
        }
        
        // Headers pour iframe
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        res.send(`<!DOCTYPE html><html>${html}</html>`);
        
    } catch (error) {
        console.error('Proxy error:', error);
        
        // Page d'erreur simple
        const errorPage = `
            <!DOCTYPE html>
            <html>
            <head><title>Proxy Error</title></head>
            <body style="font-family:Arial;padding:40px;text-align:center;background:#f5f5f5;">
                <div style="background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                    <h1 style="color:#e74c3c;">🚫 Proxy Error</h1>
                    <p><strong>URL:</strong> ${url}</p>
                    <p><strong>Error:</strong> ${error.message}</p>
                    <hr>
                    <a href="${url}" target="_blank" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
                        Open Direct Link
                    </a>
                </div>
            </body>
            </html>
        `;
        
        res.status(500).send(errorPage);
    }
}
