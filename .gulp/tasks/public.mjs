import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import { dest, src } from 'gulp';
import { config } from '../config.mjs';

export const handlePublic = () => {
	return src(config.path.src.public, { encoding: false, ignore: ['**/_*'] })
		.pipe(plumber())
		.pipe(newer(config.path.dest.public))
		.pipe(dest(config.path.dest.public));
};
