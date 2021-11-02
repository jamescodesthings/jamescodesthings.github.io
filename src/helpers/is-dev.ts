/**
 * Are we running in Stencil.js dev mode?
 * @return true if the app is running in stencil --dev mode
 */
export function isDev(): boolean {
  return !!window?.dev;
}
