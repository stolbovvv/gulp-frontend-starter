import { parallel, series } from 'gulp';
import { runClean } from './.gulp/clean.mjs';
import { runServe } from './.gulp/serve.mjs';
import { runWatch } from './.gulp/watch.mjs';
import { handlePages } from './.gulp/tasks/pages.mjs';
import { handleFonts } from './.gulp/tasks/fonts.mjs';
import { handleIcons } from './.gulp/tasks/icons.mjs';
import { handleImages } from './.gulp/tasks/images.mjs';
import { handlePublic } from './.gulp/tasks/public.mjs';
import { handleStyles } from './.gulp/tasks/styles.mjs';
import { handleScripts } from './.gulp/tasks/scripts.mjs';

const production = [handlePublic, handlePages, handleFonts, handleIcons, handleImages, handleStyles, handleScripts];
const development = [handlePages, handleFonts, handleIcons, handleImages, handleStyles, handleScripts];

export const clean = series(runClean);
export const build = series(runClean, ...production);
export const preview = series(runClean, ...production, runServe);

export default series(series(runClean), series(...development), parallel(runServe, runWatch));
