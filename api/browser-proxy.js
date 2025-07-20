import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('URL requise');
    }
    
    let browser = null;
    
    try {
        // Lancer un navigateur headless
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        
        const page = await browser.newPage();
        
        // Simuler un vrai navigateur
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
        });
        
        // Aller à la page et attendre le chargement complet
        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        // Attendre que le contenu se charge (important pour les sites JS lourds)
        await page.waitForTimeout(3000);
        
        // Obtenir le HTML complet après rendu JavaScript
        const html = await page.content();
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *');
        
        res.send(html);
        
    } catch (error) {
        console.error('Browser proxy error:', error);
        res.status(500).send(`
            <html><body>
                <h1>Erreur de rendu</h1>
                <p>Impossible de charger: ${url}</p>
                <p>Erreur: ${error.message}</p>
            </body></html>
        `);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export const config = {
    maxDuration: 30,
};
