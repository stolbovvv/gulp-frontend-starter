import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import { dest, src } from 'gulp';
import { config } from '../config.mjs';

export const handleFonts = () => {
	return src(config.path.src.fonts, { encoding: false, ignore: ['**/_*'] })
		.pipe(plumber())
		.pipe(newer(config.path.dest.fonts))
		.pipe(dest(config.path.dest.fonts));
};
