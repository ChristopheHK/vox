import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send(`
            <html><body>
                <h1>URL manquante</h1>
                <p>Usage: ?url=https://example.com</p>
            </body></html>
        `);
    }
    
    let browser = null;
    
    try {
        console.log('Lancement du navigateur...');
        
        // Configuration Chromium pour Vercel
        browser = await puppeteer.launch({
            args: [
                ...chromium.args,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
            defaultViewport: { width: 1200, height: 800 },
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
        
        console.log('Navigateur lancé, création de la page...');
        const page = await browser.newPage();
        
        // Headers réalistes pour Voxer
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        await page.setExtraHTTPHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        });
        
        console.log(`Navigation vers: ${url}`);
        
        // Aller à la page avec timeout généreux
        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 45000 
        });
        
        console.log('Page chargée, attente du contenu...');
        
        // Attendre que Voxer se charge complètement
        await page.waitForTimeout(5000);
        
        // Essayer d'attendre des éléments spécifiques à Voxer si possible
        try {
            await page.waitForSelector('body', { timeout: 10000 });
        } catch (e) {
            console.log('Timeout sur les sélecteurs, continuons...');
        }
        
        console.log('Récupération du HTML...');
        
        // Obtenir le HTML complet après rendu JavaScript
        const html = await page.content();
        
        console.log(`HTML récupéré: ${html.length} caractères`);
        
        // Headers pour permettre l'iframe
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Content-Security-Policy', 'frame-ancestors *');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        res.status(200).send(html);
        
    } catch (error) {
        console.error('Browser proxy error:', error);
        res.status(500).send(`
            <html><body>
                <h1>Erreur de rendu navigateur</h1>
                <p><strong>URL:</strong> ${url}</p>
                <p><strong>Erreur:</strong> ${error.message}</p>
                <p><strong>Stack:</strong> <pre>${error.stack}</pre></p>
                <hr>
                <p>Essayez le proxy simple: <br>
                <a href="/api/proxy?url=${encodeURIComponent(url)}">/api/proxy?url=${encodeURIComponent(url)}</a></p>
            </body></html>
        `);
    } finally {
        if (browser) {
            console.log('Fermeture du navigateur...');
            await browser.close();
        }
    }
}

// Configuration Vercel pour augmenter les limites
export const config = {
    maxDuration: 60, // 60 secondes max
    memory: 1024     // Plus de mémoire pour Chromium
};
