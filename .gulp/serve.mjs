import chalk from 'chalk';
import { create } from 'browser-sync';
import { config } from './config.mjs';

export const server = create(config.name);

export const runServe = () => {
	server.init({
		logPrefix: chalk.green.bold(server.name),
		server: {
			baseDir: config.mode.prod ? [config.path.dest.root] : [config.path.dest.root, config.path.public.root],
		},
		notify: false,
		online: false,
		open: config.mode.prod,
		port: config.mode.prod ? 8080 : 1234,
		ui: false,
	});
};
