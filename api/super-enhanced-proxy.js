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
        
        // INJECTION ULTRA-AGGRESSIVE AVEC AUTO-CLICK
        const ultraHacks = `
            <script>
                console.log('🚀 ULTRA VOXER HACKS V2 LOADING...');
                
                // === 1. FLASH SIMULATION ULTRA-COMPLETE ===
                (function() {
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
                    Object.defineProperty(navigator, 'javaEnabled', {
                        get: function() { return function() { return true; }; },
                        configurable: false
                    });
                    
                    window.navigator.cookieEnabled = true;
                    window.navigator.onLine = true;
                    
                    console.log('✅ JavaScript ultra-enablement complete');
                })();
                
                // === 3. VOXER-SPECIFIC HACKS ===
                (function() {
                    window.VOXER_ENABLED = true;
                    window.FLASH_AVAILABLE = true;
                    window.IS_EMBEDDED = false;
                    window.IS_DIRECT_ACCESS = true; // NOUVEAU !
                    
                    window.hasFlash = function() { return true; };
                    window.checkFlash = function() { return true; };
                    window.detectFlash = function() { return { available: true, version: '32.0.0' }; };
                    
                    window.swfobject = window.swfobject || {
                        registerObject: function() { return true; },
                        embedSWF: function(swf, id, w, h, version, express, params, attrs, callback) {
                            console.log('SWF embed intercepted:', swf);
                            const container = document.getElementById(id);
                            if (container) {
                                container.innerHTML = '<div style="background:#000;color:#fff;padding:20px;text-align:center;">🎙️ Voxer Audio Player<br><small>Loading...</small></div>';
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
                
                // === 4. IFRAME & WINDOW MASKING EXTREME ===
                (function() {
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
                        
                        // NOUVEAU: Masquer complètement qu'on est dans un proxy
                        Object.defineProperty(window, 'location', {
                            get: function() {
                                return {
                                    href: '${url}',
                                    protocol: 'https:',
                                    host: 'web.voxer.com',
                                    hostname: 'web.voxer.com',
                                    pathname: '${new URL(url).pathname}',
                                    search: '${new URL(url).search}',
                                    origin: 'https://web.voxer.com',
                                    toString: function() { return '${url}'; },
                                    replace: function() { console.log('Location replace blocked'); },
                                    assign: function() { console.log('Location assign blocked'); }
                                };
                            },
                            configurable: false
                        });
                        
                        Object.defineProperty(document, 'domain', {
                            get: function() { return 'web.voxer.com'; },
                            set: function(val) { return val; },
                            configurable: false
                        });
                        
                    } catch(e) { console.log('Window masking partial fail:', e); }
                })();
                
                // === 5. AUTO-CLICK & EXECUTION FORCÉE ===
                document.addEventListener('DOMContentLoaded', function() {
                    console.log('🎯 DOM ready, starting auto-click sequence...');
                    
                    // AUTO-CLICK sur "Open Direct Link" après 1 seconde
                    setTimeout(function() {
                        console.log('🔍 Looking for direct link button...');
                        
                        // Multiples sélecteurs pour trouver le bouton
                        const selectors = [
                            'a[href*="voxer.com"]',
                            'button:contains("Open Direct Link")',
                            'a:contains("Open Direct Link")',
                            'a:contains("Direct Link")',
                            '*[onclick*="direct"]',
                            '.btn:contains("Open")',
                            'a[target="_blank"]'
                        ];
                        
                        let buttonFound = false;
                        
                        selectors.forEach(selector => {
                            if (!buttonFound) {
                                try {
                                    const btn = document.querySelector(selector);
                                    if (btn) {
                                        console.log('🔄 Auto-clicking button:', selector);
                                        btn.click();
                                        buttonFound = true;
                                    }
                                } catch(e) {}
                            }
                        });
                        
                        // Fallback: chercher par texte dans tous les éléments cliquables
                        if (!buttonFound) {
                            const clickableElements = document.querySelectorAll('a, button, div[onclick], span[onclick]');
                            clickableElements.forEach(element => {
                                const text = element.textContent || element.innerText || '';
                                if (text.toLowerCase().includes('direct') || 
                                    text.toLowerCase().includes('open') ||
                                    text.toLowerCase().includes('voxer')) {
                                    console.log('🔄 Auto-clicking by text:', text);
                                    element.click();
                                    buttonFound = true;
                                }
                            });
                        }
                    }, 1500);
                    
                    // FORCE REDIRECT si toujours bloqué après 4 secondes
                    setTimeout(function() {
                        const bodyText = document.body.textContent.toLowerCase();
                        
                        if (bodyText.includes('voxer content may require direct access') || 
                            bodyText.includes('open direct link') ||
                            bodyText.includes('flash simulation active')) {
                            
                            console.log('🚀 Fallback detected, forcing iframe replacement...');
                            
                            // Remplacer par iframe direct
                            document.body.innerHTML = \`
                                <style>
                                    body { margin: 0; padding: 0; overflow: hidden; background: #000; }
                                    .direct-frame { width: 100vw; height: 100vh; border: none; }
                                    .status { 
                                        position: absolute; top: 10px; left: 10px; z-index: 1000;
                                        background: rgba(76,175,80,0.9); color: white; padding: 8px 15px;
                                        border-radius: 20px; font-size: 11px; font-family: Arial;
                                    }
                                </style>
                                <div class="status">🔄 Direct Voxer Access</div>
                                <iframe class="direct-frame" src="${url}"></iframe>
                            \`;
                        }
                    }, 4000);
                });
                
                console.log('🎉 ULTRA VOXER HACKS V2 LOADED!');
            </script>
        `;
        
        // Injecter au début
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
        
        res.send(finalHtml);
        
    } catch (error) {
        res.status(500).send(`Erreur: ${error.message}`);
    }
}
