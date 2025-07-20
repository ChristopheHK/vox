// Dans la section DOMContentLoaded, remplacez par :

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM ready, implementing SMART VOXER SEQUENCE...');
    
    let phase = 'waiting_for_real_content';
    let attempts = 0;
    const maxAttempts = 10;
    
    function smartVoxerSequence() {
        attempts++;
        const bodyText = document.body.textContent.toLowerCase();
        const bodyLength = document.body.textContent.length;
        
        console.log(\`🔍 Phase: \${phase}, Attempt: \${attempts}, Content length: \${bodyLength}\`);
        
        if (attempts > maxAttempts) {
            console.log('⏰ Max attempts reached, forcing iframe fallback');
            forceIframeFallback();
            return;
        }
        
        switch(phase) {
            case 'waiting_for_real_content':
                // Si on a encore la page de download ou contenu trop court
                if (bodyText.includes('download voxer app') || bodyLength < 500) {
                    console.log('⏳ Still waiting for real Voxer content...');
                    setTimeout(smartVoxerSequence, 2000);
                } else {
                    console.log('✅ Real content detected, moving to click phase');
                    phase = 'looking_for_button';
                    setTimeout(smartVoxerSequence, 1500);
                }
                break;
                
            case 'looking_for_button':
                if (bodyText.includes('open direct link') || bodyText.includes('direct access')) {
                    console.log('🎯 Direct link button detected, attempting smart click');
                    phase = 'clicking_button';
                    setTimeout(smartVoxerSequence, 1000);
                } else {
                    console.log('🔍 No button yet, waiting more...');
                    setTimeout(smartVoxerSequence, 2000);
                }
                break;
                
            case 'clicking_button':
                performSmartClick();
                phase = 'waiting_for_result';
                setTimeout(smartVoxerSequence, 3000);
                break;
                
            case 'waiting_for_result':
                // Vérifier si ça a marché
                if (bodyText.includes('download voxer app')) {
                    console.log('❌ Clicked wrong button, back to download page');
                    phase = 'waiting_for_real_content';
                    setTimeout(smartVoxerSequence, 2000);
                } else if (bodyText.includes('voxer content may require')) {
                    console.log('🚀 Need to force iframe fallback');
                    forceIframeFallback();
                } else {
                    console.log('✅ Smart sequence completed successfully');
                }
                break;
        }
    }
    
    function performSmartClick() {
        const buttons = document.querySelectorAll('a, button, div[onclick]');
        let clicked = false;
        
        buttons.forEach(btn => {
            if (!clicked) {
                const text = (btn.textContent || '').toLowerCase();
                const href = (btn.href || '').toLowerCase();
                
                // CRITÈRES STRICTS pour éviter les faux clics
                if ((text.includes('open direct') || text.includes('direct link')) &&
                    !text.includes('download') &&
                    !text.includes('app') &&
                    !href.includes('download') &&
                    !href.includes('app-store') &&
                    !href.includes('play.google')) {
                    
                    console.log('🎯 SMART CLICK:', text);
                    btn.click();
                    clicked = true;
                }
            }
        });
        
        if (!clicked) {
            console.log('⚠️ No suitable button found for smart click');
        }
    }
    
    function forceIframeFallback() {
        document.body.innerHTML = \`
            <style>
                body { margin: 0; padding: 0; overflow: hidden; }
                .direct-frame { width: 100vw; height: 100vh; border: none; }
                .status { 
                    position: fixed; top: 10px; left: 10px; z-index: 9999;
                    background: #4CAF50; color: white; padding: 8px 15px;
                    border-radius: 15px; font-size: 11px; font-family: Arial;
                }
            </style>
            <div class="status">🎯 Smart Fallback Active</div>
            <iframe class="direct-frame" src="${url}"></iframe>
        \`;
    }
    
    // Démarrer la séquence après 2 secondes
    setTimeout(smartVoxerSequence, 2000);
});
