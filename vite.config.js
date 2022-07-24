import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  esbuild: {
    target: 'es6',
    supported: { arrow: false },
  },
  plugins: [createHtmlPlugin({ minify: true })],
});
