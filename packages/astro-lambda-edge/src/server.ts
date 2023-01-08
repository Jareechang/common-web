import { polyfill } from '@astrojs/webapi';
import type { SSRManifest } from 'astro';
import { NodeApp } from 'astro/app/node';
import { middleware } from './middleware';

polyfill(globalThis, {
	exclude: 'window document',
});

export function createExports(manifest: SSRManifest) {
	const app = new NodeApp(manifest);
	return {
		handler: middleware(app),
	};
}
