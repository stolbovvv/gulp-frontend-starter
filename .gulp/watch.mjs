import chalk from 'chalk';
import { watch } from 'gulp';
import { config } from './config.mjs';
import { server } from './serve.mjs';
import { handlePages } from './tasks/pages.mjs';
import { handleFonts } from './tasks/fonts.mjs';
import { handleIcons } from './tasks/icons.mjs';
import { handleImages } from './tasks/images.mjs';
import { handleStyles } from './tasks/styles.mjs';
import { handleScripts } from './tasks/scripts.mjs';
import { deleteSync } from 'del';

export const runWatch = () => {
	const pages = watch(config.path.watch.pages);
	const fonts = watch(config.path.watch.fonts);
	const icons = watch(config.path.watch.icons);
	const images = watch(config.path.watch.images);
	const styles = watch(config.path.watch.styles);
	const scripts = watch(config.path.watch.scripts);

	pages.on('all', (event, path) => {
		handleLog(event, path);
		handlePages();
		server.reload();
	});

	fonts.on('all', (event, path) => {
		handleLog(event, path);
		handleFonts();
		server.reload();
	});

	icons.on('all', (event, path) => {
		handleLog(event, path);
		handleIcons();
		server.reload();
	});

	images.on('all', (event, path) => {
		handleLog(event, path);
		handleImages();
		server.reload();
	});

	styles.on('all', (event, path) => {
		handleLog(event, path);
		handleStyles();
		server.reload();
	});

	scripts.on('all', async (event, path) => {
		handleLog(event, path);
		await handleScripts();
		server.reload();
	});

	pages.on(['unlink'], deleteFiles);
	fonts.on(['unlink'], deleteFiles);
	images.on(['unlink'], deleteFiles);
	styles.on(['unlink'], deleteFiles);
	scripts.on(['unlink'], deleteFiles);
};

function handleLog(event, path) {
	if (event === 'unlinkDir') return;

	const name = chalk.green.bold(server.name);
	const pathColor = event === 'unlink' ? 'red' : 'green';

	console.log(`[${name}] Event ${chalk.magenta(event)} triggered for ${chalk[pathColor](path)}`);
}

function deleteFiles(path) {
	deleteSync(path.replace(config.path.src.root, config.path.dest.root));
}
