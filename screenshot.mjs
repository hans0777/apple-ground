/**
 * 사용법: node screenshot.mjs [URL]
 * 예시:  node screenshot.mjs http://localhost:3000
 *
 * 필요: npm install puppeteer
 */
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';

const url = process.argv[2] || 'http://localhost:3000';

const browser = await puppeteer.launch({ headless: 'new' });
const page    = await browser.newPage();

// Desktop screenshot
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1500)); // wait for animations
const desktopShot = await page.screenshot({ fullPage: true });
await writeFile('screenshot_desktop.png', desktopShot);
console.log('✅ screenshot_desktop.png 저장 완료');

// Mobile screenshot
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1500));
const mobileShot = await page.screenshot({ fullPage: true });
await writeFile('screenshot_mobile.png', mobileShot);
console.log('✅ screenshot_mobile.png 저장 완료');

await browser.close();
