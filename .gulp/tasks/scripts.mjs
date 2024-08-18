import nodePath from 'node:path';
import chalk from 'chalk';
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
				exclude: ['node_modules/**'],
			}),
		);
	}

	let bundle;

	try {
		bundle = await rollup({
			input: config.path.src.scripts,
			cache,
			plugins,
		});
	} catch (error) {
		handleError(error);
		return;
	}

	try {
		await bundle.write({
			dir: config.path.dest.scripts,
			format: 'iife',
			sourcemap: config.mode.dev,
			entryFileNames: `[name]${config.mode.prod ? '.min' : ''}.js`,
		});

		if (config.mode.prod) {
			await bundle.write({
				dir: config.path.dest.scripts,
				format: 'iife',
				sourcemap: config.mode.dev,
				entryFileNames: `[name].js`,
				plugins: [terser()],
			});
		}
	} catch (error) {
		handleError(error);
		return;
	}
};

function handleError(error) {
	const name = chalk.bold.red(config.name);

	console.log(`[${name}] ${chalk.bold.red('Rollup error:')}`, chalk.red(error.message));
}
