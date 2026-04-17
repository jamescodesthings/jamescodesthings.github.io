import Debug from 'debug';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, writeFile } from 'fs/promises';
import config from './config.js';

const debug = Debug('codesthings:pdf');
debug.enabled = true;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

debug('Building PDF');

const { SERVER_URL, GOTENBERG_URL } = process.env;
debug(`Server Url: ${SERVER_URL}`);
debug(`Gotenberg Url: ${GOTENBERG_URL}`);

const publicAssetsDir = resolve(root, config.outputDir, 'assets');
const pagesAssetsDir = resolve(root, 'pages', 'assets');

export async function urlToPdf(path, outputPath) {
  const absHtmlPath = `${SERVER_URL}${path}`;
  debug(`Converting ${absHtmlPath} to ${outputPath}`);

  try {
    const gotenbergResponse = await fetch(`${GOTENBERG_URL}/health`, { method: 'GET' });
    if (gotenbergResponse.ok) {
      debug(`Gotenberg is available at ${GOTENBERG_URL}`);
    } else {
      throw new Error(`Gotenberg is not available at ${GOTENBERG_URL}`);
    }
  } catch (err) {
    throw new Error(`Error connecting to Gotenberg at ${GOTENBERG_URL}: ${err}`);
  }

  try {
    const testServerResponse = await fetch(absHtmlPath, { method: 'GET' });
    if (testServerResponse.ok) {
      debug(`Response Status: ${testServerResponse.status} ${testServerResponse.statusText}`);
      debug(`Test file is available at ${absHtmlPath}`);
      const body = await testServerResponse.text();
      debug(`Test file content length: ${body.length}`);
      debug(`Test file content contents:\n${body}`);
    } else {
      throw new Error(`Test file is not available at ${absHtmlPath}: ${testServerResponse.statusText}`);
    }
  } catch (err) {
    throw new Error(`Error connecting to test file at ${absHtmlPath}: ${err}`);
  }

  try {
    const formData = new FormData();
    formData.append('url', absHtmlPath);
    formData.append('marginTop', '0');
    formData.append('marginBottom', '0');
    formData.append('marginLeft', '0');
    formData.append('marginRight', '0');
    formData.append('printBackground', 'true');
    debug(`Converting to PDF`);
    const response = await fetch(`${GOTENBERG_URL}/forms/chromium/convert/url`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      debug(`Error converting to PDF: (${response.status}) ${response.statusText}`);
      const body = await response.text();
      debug(`Response body: ${body}`);
      throw new Error(`${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(pdfBuffer));
  } catch (err) {
    throw new Error(`Error converting HTML to PDF: ${err}`);
  }
}

const publicPdfPath = resolve(publicAssetsDir, 'cv.pdf');
await urlToPdf('/', publicPdfPath);
const pagesPdfPath = resolve(pagesAssetsDir, 'cv.pdf');
await copyFile(publicPdfPath, pagesPdfPath);

const publicDarkPdfPath = resolve(publicAssetsDir, 'cv-dark.pdf');
await urlToPdf('/?dark=true', publicDarkPdfPath);
const pagesDarkPdfPath = resolve(pagesAssetsDir, 'cv-dark.pdf');
await copyFile(publicDarkPdfPath, pagesDarkPdfPath);

debug(`PDF saved to:`);
debug(` - ${publicPdfPath}`);
debug(` - ${pagesPdfPath}`);
debug(` - ${publicDarkPdfPath}`);
debug(` - ${pagesDarkPdfPath}`);
