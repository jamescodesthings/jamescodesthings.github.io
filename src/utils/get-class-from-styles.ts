import { camelCase } from 'lodash';

/**
 * Given the pretty name of a CSS Module class, this resolves the actual name.
 * @param styleModule The styles imported
 * @param prettyClassName The class name to get if it exists
 * @return The actual CSS Classname to apply to a dom node
 */
export function getClassFromStyles(styleModule: CSSModuleClasses, prettyClassName: string | undefined): string {
  if (!prettyClassName || !styleModule) return '';

  const result = prettyClassName
    .split(' ')
    .map(className => {
      const camel = camelCase(className);
      console.log('class:', className);
      console.log('camel:', camel);
      console.log('styleModule:', styleModule);
      return styleModule[camel] || className || '';
    })
    .join(' ');

  console.debug('classes: %s', result);
  return result;
}
