import nodePath from 'node:path';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import { config } from '../config.mjs';
import { globSync } from 'glob';

let cache;

export const handleScripts = async () => {
	const plugins = [nodeResolve(), commonjs()];

	if (config.mode.prod) {
		plugins.push(
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**',
			}),
			terser(),
		);
	}

	const bundle = await rollup({
		input: getEntries(config.path.src.scripts),
		cache,
		plugins,
	});

	await bundle.write({
		dir: config.path.dest.scripts,
		format: 'es',
		sourcemap: config.mode.dev,
		entryFileNames: `[name]${config.mode.prod ? '.min' : ''}.js`,
		chunkFileNames: `[name]${config.mode.prod ? '.min' : ''}.js`,
	});
};

function getEntries(glob) {
	const entries = {};

	globSync(glob).forEach((path) => {
		const { name } = nodePath.parse(path);
		entries[name] = path;
	});

	return entries;
}

