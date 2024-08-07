import _if from 'gulp-if';
import newer from 'gulp-newer';
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
	const postcssPlugins = [postcssImport(), postcssUrl()];

	if (config.mode.prod) {
		postcssPlugins.push(
			postcssPresetEnv({
				stage: 0,
			}),
			postcssAutoprefixer({
				grid: true,
				cascade: true,
			}),
			postcssCssnano(),
		);
	}

	return src(config.path.src.styles)
		.pipe(plumber())
		.pipe(newer(config.path.dest.styles))
		.pipe(postcss(postcssPlugins))
		.pipe(_if(config.mode.prod, rename({ suffix: '.min' })))
		.pipe(dest(config.path.dest.styles));
};
