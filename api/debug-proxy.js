export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('URL manquante');
    }
    
    try {
        const response = await fetch(url);
        let html = await response.text();
        
        // Script de debug ULTRA simple
        const debugScript = `
<script>
alert('DEBUG: Script loaded!');
console.log('DEBUG: Voxer page loaded');

setTimeout(function() {
    document.body.style.background = 'red';
    document.body.innerHTML = '<h1 style="color:white;text-align:center;padding:50px;">DEBUG: SCRIPT WORKS!</h1><p style="color:white;text-align:center;">Original URL: ${url}</p>';
}, 2000);
</script>`;
        
        // Ajouter au début du body
        html = html.replace(/<body[^>]*>/i, '$&' + debugScript);
        
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        
        res.send(html);
        
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}
