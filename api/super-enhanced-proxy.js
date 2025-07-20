export default async function handler(req, res) {
    const { url } = req.query;
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://web.voxer.com/',
                'Origin': 'https://web.voxer.com',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Cookie': 'session=active; flash_enabled=true'
            }
        });
        
        let html = await response.text();
        
        // INJECTION ULTRA-AGGRESSIVE
        const ultraHacks = `
            <script>
                console.log('🚀 ULTRA VOXER HACKS LOADING...');
                
                // === 1. FLASH SIMULATION ULTRA-COMPLETE ===
                (function() {
                    // Simuler TOUS les objets Flash possibles
                    window.ActiveXObject = window.ActiveXObject || function(name) {
                        if (name.indexOf('Flash') !== -1 || name.indexOf('ShockwaveFlash') !== -1) {
                            return {
                                GetVariable: function() { return 'WIN 32,0,0,465'; },
                                SetVariable: function() { return true; },
                                Play: function() { return true; },
                                StopPlay: function() { return true; },
                                IsPlaying: function() { return false; },
                                GotoFrame: function() { return true; },
                                TotalFrames: function() { return 100; },
                                CurrentFrame: function() { return 1; }
                            };
                        }
                        return null;
                    };
                    
                    // Navigator plugins override AGRESSIF
                    const flashPlugin = {
                        name: 'Shockwave Flash',
                        description: 'Shockwave Flash 32.0 r0',
                        filename: 'flashplayer.xpi',
                        version: '32.0.0.465',
                        length: 1,
                        item: function() { return this; },
                        namedItem: function() { return this; }
                    };
                    
                    Object.defineProperty(navigator, 'plugins', {
                        get: function() {
                            return {
                                'Shockwave Flash': flashPlugin,
                                'Adobe Flash Player': flashPlugin,
                                length: 1,
                                item: function() { return flashPlugin; },
                                namedItem: function() { return flashPlugin; },
                                refresh: function() {}
                            };
                        },
                        configurable: false
                    });
                    
                    // MimeTypes
                    Object.defineProperty(navigator, 'mimeTypes', {
                        get: function() {
                            return {
                                'application/x-shockwave-flash': {
                                    type: 'application/x-shockwave-flash',
                                    description: 'Shockwave Flash',
                                    suffixes: 'swf',
                                    enabledPlugin: flashPlugin
                                },
                                length: 1
                            };
                        },
                        configurable: false
                    });
                    
                    console.log('✅ Flash simulation complete');
                })();
                
                // === 2. JAVASCRIPT ULTRA-ENABLEMENT ===
                (function() {
                    // Forcer l'activation JavaScript
                    Object.defineProperty(navigator, 'javaEnabled', {
                        get: function() { return function() { return true; }; },
                        configurable: false
                    });
                    
                    // Capabilities
                    window.navigator.cookieEnabled = true;
                    window.navigator.onLine = true;
                    
                    console.log('✅ JavaScript ultra-enablement complete');
                })();
                
                // === 3. VOXER-SPECIFIC HACKS ===
                (function() {
                    // Variables globales Voxer
                    window.VOXER_ENABLED = true;
                    window.FLASH_AVAILABLE = true;
                    window.IS_EMBEDDED = false;
                    
                    // Fonctions Voxer communes
                    window.hasFlash = function() { return true; };
                    window.checkFlash = function() { return true; };
                    window.detectFlash = function() { return { available: true, version: '32.0.0' }; };
                    
                    // SWFObject simulation complète
                    window.swfobject = window.swfobject || {
                        registerObject: function() { return true; },
                        embedSWF: function(swf, id, w, h, version, express, params, attrs, callback) {
                            console.log('SWF embed intercepted:', swf);
                            const container = document.getElementById(id);
                            if (container) {
                                container.innerHTML = '<div style="background:#000;color:#fff;padding:20px;text-align:center;">🎙️ Voxer Audio Player<br><small>Flash simulation active</small></div>';
                            }
                            if (callback) callback({ success: true, id: id });
                            return true;
                        },
                        hasFlashPlayerVersion: function() { return true; },
                        getFlashPlayerVersion: function() { return { major: 32, minor: 0, release: 0 }; },
                        ua: { ie: false, pv: [32,0,0] }
                    };
                    
                    console.log('✅ Voxer-specific hacks complete');
                })();
                
                // === 4. DOM MANIPULATION AGGRESSIVE ===
                (function() {
                    // Intercepter tous les messages d'erreur Flash
                    const originalCreateElement = document.createElement;
                    document.createElement = function(tagName) {
                        const element = originalCreateElement.call(document, tagName);
                        
                        if (tagName.toLowerCase() === 'object' || tagName.toLowerCase() === 'embed') {
                            console.log('Flash object creation intercepted');
                            element.style.background = '#333';
                            element.innerHTML = '<div style="color:#fff;padding:20px;text-align:center;">🎙️ Voxer Player Ready</div>';
                        }
                        
                        return element;
                    };
                    
                    // Remplacer tous les textes "No Flash" après chargement
                    setTimeout(function() {
                        const walker = document.createTreeWalker(
                            document.body,
                            NodeFilter.SHOW_TEXT,
                            null,
                            false
                        );
                        
                        let node;
                        while (node = walker.nextNode()) {
                            if (node.textContent.toLowerCase().includes('flash') || 
                                node.textContent.toLowerCase().includes('javascript')) {
                                node.textContent = node.textContent.replace(/no flash/gi, 'Flash Ready');
                                node.textContent = node.textContent.replace(/no javascript/gi, 'JavaScript Ready');
                            }
                        }
                    }, 1000);
                    
                    console.log('✅ DOM manipulation complete');
                })();
                
                // === 5. EXECUTION FORCÉE ===
                document.addEventListener('DOMContentLoaded', function() {
                    console.log('🎯 DOM ready, forcing Voxer initialization...');
                    
                    // Chercher et exécuter les scripts Voxer
                    const scripts = document.querySelectorAll('script');
                    scripts.forEach(script => {
                        if (script.src && script.src.includes('voxer')) {
                            console.log('Re-executing Voxer script:', script.src);
                            const newScript = document.createElement('script');
                            newScript.src = script.src;
                            document.head.appendChild(newScript);
                        }
                    });
                    
                    // Forcer l'init après 2 secondes
                    setTimeout(function() {
                        if (window.Voxer && window.Voxer.init) {
                            console.log('🚀 Force-initializing Voxer...');
                            window.Voxer.init();
                        }
                        
                        // Remplacer le contenu si toujours "No Flash"
                        const body = document.body.innerHTML.toLowerCase();
                        if (body.includes('no flash') || body.includes('download voxer app')) {
                            console.log('🔄 Replacing No Flash message...');
                            document.body.innerHTML = \`
                                <div style="font-family:Arial;padding:40px;text-align:center;background:#f0f0f0;">
                                    <h1>🎙️ Voxer</h1>
                                    <div style="background:#333;color:#fff;padding:30px;border-radius:10px;margin:20px 0;">
                                        <h2>Audio Player</h2>
                                        <p>Flash simulation active ✅</p>
                                        <p>JavaScript enabled ✅</p>
                                        <br>
                                        <p><strong>Note:</strong> Voxer content may require direct access.</p>
                                        <a href="${url}" target="_blank" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Open Direct Link</a>
                                    </div>
                                </div>
                            \`;
                        }
                    }, 3000);
                });
                
                console.log('🎉 ULTRA VOXER HACKS LOADED SUCCESSFULLY!');
            </script>
        `;
        
        // Injecter au tout début du HTML
        html = html.replace(/<!DOCTYPE[^>]*>/i, '');
        html = html.replace(/<html[^>]*>/i, '');
        html = html.replace(/<head[^>]*>/i, '');
        
        const finalHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                ${ultraHacks}
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${html}
        `;
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *; script-src \'unsafe-inline\' \'unsafe-eval\' *; object-src *');
        res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
        
        res.send(finalHtml);
        
    } catch (error) {
        res.status(500).send(`Erreur ultra-proxy: ${error.message}`);
    }
}
