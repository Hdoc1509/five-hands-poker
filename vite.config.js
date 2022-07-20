import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    target: 'es6',
    supported: { arrow: false },
  },
});
