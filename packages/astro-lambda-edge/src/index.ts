import type { AstroAdapter, AstroIntegration } from 'astro';

export function getAdapter(): AstroAdapter {
  const pkgName = '@common-web/astro-lambda-edge';
  return {
    name: pkgName,
    serverEntrypoint: `${pkgName}/server.js`,
    exports: ['handler'],
  };
}

export default function createIntegration(): AstroIntegration {
  return {
    name: '@astrojs/node',
    hooks: {
      'astro:config:done': ({ setAdapter, config }) => {
        setAdapter(getAdapter());
      },
    },
  };
}
