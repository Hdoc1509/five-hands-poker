import { build } from 'esbuild';

build({
  entryPoints: ['src/js/index.js', 'src/js/game-rules.js', 'src/css/index.css'],
  bundle: true,
  outdir: 'dist/',
  loader: { '.svg': 'file' },
  splitting: true,
  minify: true,
  format: 'esm',
});
