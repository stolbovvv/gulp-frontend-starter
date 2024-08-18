import _if from 'gulp-if';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';
import { dest, src } from 'gulp';
import { config } from '../config.mjs';

export const handlePages = () => {
	const iconStr = /(<use\s+href=["|'].?\/assets\/icons\/)([^"]+).svg/gi;
	const stylesStr = /(<link\s+rel=["|']stylesheet["|']\s+href=["|'].?\/assets\/styles\/[^"]+).css(["|']>)/gi;
	const scriptsStr = /(<script\s+type=["|']module["|']\s+src=["|'].?\/assets\/scripts\/[^"]+).js(["|']>)/gi;

	const version = '?v=' + Date.parse(new Date());

	return src(config.path.src.pages, { ignore: ['**/_*'] })
		.pipe(plumber())
		.pipe(newer(config.path.dest.pages))
		.pipe(replace(iconStr, `$1sprite.svg${version}#$2`))
		.pipe(_if(config.mode.prod, replace(stylesStr, `$1.min.css${version}$2`)))
		.pipe(_if(config.mode.prod, replace(scriptsStr, `$1.min.js${version}$2`)))
		.pipe(dest(config.path.dest.pages));
};
