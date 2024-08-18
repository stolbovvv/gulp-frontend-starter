import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { accessSync, constants } from 'node:fs';
import _if from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import postcssCssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import postcssAutoprefixer from 'autoprefixer';
import { config } from '../config.mjs';
import { dest, src } from 'gulp';

export const handleStyles = () => {
	const postcssPlugins = [
		postcssImport({
			resolve: resolveFile,
		}),
		postcssUrl(),
	];

	if (config.mode.prod) {
		postcssPlugins.push(
			postcssPresetEnv({
				stage: 0,
			}),
			postcssAutoprefixer({
				grid: true,
				cascade: true,
			}),
		);
	}

	return src(config.path.src.styles)
		.pipe(plumber())
		.pipe(postcss(postcssPlugins))
		.pipe(dest(config.path.dest.styles))
		.pipe(_if(config.mode.prod, postcss([postcssCssnano()])))
		.pipe(_if(config.mode.prod, rename({ suffix: '.min' })))
		.pipe(_if(config.mode.prod, dest(config.path.dest.styles)));
};

function resolveFile(id, baseDir) {
	const file = path.join(baseDir, id);

	try {
		accessSync(file, constants.F_OK);
		return file;
	} catch (error) {
		return fileURLToPath(import.meta.resolve(id));
	}
}
