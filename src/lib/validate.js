// Validators for data/projects/*.json and data/photos/*.json. Each throws Error("<file>: <problem>")
// so a bad data file fails the build by name instead of rendering a broken card.

const LANES = ['work', 'make'];

function fail(file, problem) {
  throw new Error(`${file}: ${problem}`);
}

const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const isText = v => typeof v === 'string' && v.trim() !== '';

function requireKeys(obj, keys, file) {
  if (!isObject(obj)) fail(file, 'must be a JSON object');
  for (const key of keys) {
    if (obj[key] === undefined || obj[key] === null) fail(file, `missing required key "${key}"`);
  }
}

// http(s) URLs, or a root-absolute site path such as /blog/x.html (not protocol-relative).
function isLinkUrl(url) {
  if (typeof url !== 'string') return false;
  if (url.startsWith('/')) return !url.startsWith('//');
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateProject(obj, file) {
  requireKeys(obj, ['title', 'lane', 'summary', 'stack', 'links', 'featured', 'order'], file);
  if (!isText(obj.title)) fail(file, '"title" must be a non-empty string');
  if (!LANES.includes(obj.lane))
    fail(file, `"lane" must be one of ${LANES.join(', ')}, got ${JSON.stringify(obj.lane)}`);
  if (typeof obj.summary !== 'string' || obj.summary === '') fail(file, '"summary" must be a non-empty string');
  if (obj.summary.length > 110) fail(file, `"summary" is ${obj.summary.length} characters, the limit is 110`);
  if (!Array.isArray(obj.stack) || obj.stack.length < 1 || obj.stack.length > 5 || !obj.stack.every(isText)) {
    fail(file, '"stack" must be an array of 1 to 5 non-empty strings');
  }
  if (!Array.isArray(obj.links)) fail(file, '"links" must be an array');
  obj.links.forEach((link, i) => {
    if (!isObject(link)) fail(file, `"links[${i}]" must be an object`);
    for (const key of ['label', 'url', 'icon']) {
      if (!isText(link[key])) fail(file, `"links[${i}].${key}" must be a non-empty string`);
    }
    if (!isLinkUrl(link.url))
      fail(file, `"links[${i}].url" must be an http or https URL, got ${JSON.stringify(link.url)}`);
  });
  if (typeof obj.featured !== 'boolean') fail(file, '"featured" must be a boolean');
  if (typeof obj.order !== 'number' || Number.isNaN(obj.order)) fail(file, '"order" must be a number');
  if (obj.stat != null && !isText(obj.stat)) fail(file, '"stat" must be a non-empty string when present');
  if (obj.image != null && !isText(obj.image)) fail(file, '"image" must be a string or null');
  if (obj.date != null && !(typeof obj.date === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(obj.date))) {
    fail(file, '"date" must be YYYY-MM or null');
  }
  return obj;
}

export function validatePhoto(obj, file) {
  requireKeys(obj, ['src', 'alt', 'order'], file);
  if (!isText(obj.src)) fail(file, '"src" must be a non-empty string');
  if (!isText(obj.alt)) fail(file, '"alt" must be a non-empty string');
  if (typeof obj.order !== 'number' || Number.isNaN(obj.order)) fail(file, '"order" must be a number');
  if (obj.caption != null && typeof obj.caption !== 'string') fail(file, '"caption" must be a string');
  if (obj.date != null && typeof obj.date !== 'string') fail(file, '"date" must be a string');
  if (obj.exif != null) {
    if (!isObject(obj.exif)) fail(file, '"exif" must be an object');
    for (const key of ['camera', 'lens', 'focal', 'aperture', 'shutter', 'iso']) {
      if (obj.exif[key] != null && typeof obj.exif[key] !== 'string' && typeof obj.exif[key] !== 'number') {
        fail(file, `"exif.${key}" must be a string or number`);
      }
    }
  }
  return obj;
}
