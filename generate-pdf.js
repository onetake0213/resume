const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 화면과 동일한 뷰포트 고정 (A4 너비 = 794px at 96dpi)
    await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 1,
    });

    // Load the local HTML file
    const htmlPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF — 화면과 동일하게 출력
    const outputPath = path.resolve(__dirname, '박병규_이력서.pdf');
    await page.pdf({
        path: outputPath,
        width: '794px',   // 화면 .page 너비와 동일
        height: '1123px', // A4 높이 (297mm ≈ 1123px)
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        preferCSSPageSize: false, // width/height 직접 지정
    });

    console.log(`PDF가 생성되었습니다: ${outputPath}`);
    await browser.close();
})();
