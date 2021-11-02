/**
 * Default stencil sayhello function
 * @return string that says hello
 */
export function sayHello(): string {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}
