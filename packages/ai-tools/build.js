const esbuild = require('esbuild');

async function main() {
  esbuild.build({
    platform: 'node',
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './dist/index.js',
    tsconfig: './tsconfig.json',
  });
}

main();

