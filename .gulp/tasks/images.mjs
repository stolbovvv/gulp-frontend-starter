import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import { dest, src } from 'gulp';
import { config } from '../config.mjs';

export const handleImages = () => {
	return src(config.path.src.images, { encoding: false, ignore: ['**/_*'] })
		.pipe(plumber())
		.pipe(newer(config.path.dest.images))
		.pipe(dest(config.path.dest.images));
};
