import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';

export class CVToPDF {
  mappings = [
    { url: 'http://localhost:8080/?exclude_projects=true&print_contact=true', filename: 'cv.pdf' },
    { url: 'http://localhost:8080/?print_dark=true&exclude_projects=true&print_contact=true', filename: 'cv.dark.pdf' },
    { url: 'http://localhost:8080/?print_contact=true', filename: 'cv.projects.pdf' },
    { url: 'http://localhost:8080/?print_dark=true&print_contact=true', filename: 'cv.dark.projects.pdf' },
    { url: 'http://localhost:8080/?exclude_projects=true', filename: 'cv.no-contact.pdf' },
    { url: 'http://localhost:8080/?print_dark=true&exclude_projects=true', filename: 'cv.dark.no-contact.pdf' },
    { url: 'http://localhost:8080/', filename: 'cv.projects.no-contact.pdf' },
    { url: 'http://localhost:8080/?print_dark=true', filename: 'cv.dark.projects.no-contact.pdf' },
  ];

  private browser!: Browser;
  private page!: Page;
  private outputPath!: string;

  /**
   * Setup
   */
  private async init() {
    console.log('Initializing');
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    await this.createOutputDirectory();
  }

  private async createOutputDirectory() {
    this.outputPath = path.join(process.cwd(), 'dist', 'assets', 'cv');
    if (!(await fs.exists(this.outputPath))) {
      console.log('Create Output Directory: %s', this.outputPath);
      await fs.mkdir(this.outputPath, { recursive: true });
    }
  }

  private async destroy() {
    console.log('Destroying');
    await this.browser?.close();
    console.log('Done');
  }

  async run() {
    try {
      await this.init();

      for (const mapping of this.mappings) {
        await this.print(mapping.url, mapping.filename);
      }
    } catch (error) {
      console.error('Error %s:\n%s', (error as Error)?.message, (error as Error)?.stack);
    } finally {
      await this.destroy();
    }
  }

  private async print(url: string, filename: string) {
    console.log('Printing %s to %s', url, filename);
    await this.page.goto(url, { waitUntil: 'networkidle0' });

    if (url.indexOf('print_dark') !== -1) {
      console.log('Is Dark, doing stuff to make that good');
      const result = await this.page.evaluate(() => {
        const body = document.querySelector('body');
        if (!body) {
          return false;
        }
        body.className = 'print-dark dark';
        return true;
      });
      if (!result) {
        console.error('Could not add required classes to make the body dark');
      }
    }

    // Download the PDF
    const cvOutput = path.join(this.outputPath, filename);

    await this.page.pdf({
      path: cvOutput,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
      format: 'A4',
    });
    console.log('Complete, back to about:blank');
    await this.page.goto('about:blank');
  }
}

(async () => {
  const task = new CVToPDF();
  await task.run();
})();
