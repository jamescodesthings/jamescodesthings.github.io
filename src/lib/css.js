import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { transform } from 'lightningcss';

async function cssIn(dir) {
  try {
    return (await readdir(dir))
      .filter(f => f.endsWith('.css'))
      .sort()
      .map(f => join(dir, f));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// Concatenates in a fixed order and minifies. Files in the ordered list that don't exist are skipped.
export async function bundleCss(cssDir) {
  const files = [
    join(cssDir, 'tokens.css'),
    join(cssDir, 'base.css'),
    join(cssDir, 'layout.css'),
    ...(await cssIn(join(cssDir, 'components'))),
    ...(await cssIn(join(cssDir, 'pages'))),
    join(cssDir, 'print.css'),
    join(cssDir, 'legacy.css'),
  ];
  const parts = [];
  for (const file of files) {
    try {
      parts.push(await readFile(file, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
  const { code } = transform({ filename: 'styles.css', code: Buffer.from(parts.join('\n')), minify: true });
  return code.toString();
}
