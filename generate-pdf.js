const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the local HTML file
    const htmlPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    const outputPath = path.resolve(__dirname, '박병규_이력서.pdf');
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            right: '0',
            bottom: '0',
            left: '0',
        },
        preferCSSPageSize: true,
    });

    console.log(`PDF가 생성되었습니다: ${outputPath}`);
    await browser.close();
})();
