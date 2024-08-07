import { deleteAsync } from 'del';
import { config } from './config.mjs';

export const runClean = async () => {
	await deleteAsync(`${config.path.dest.root}/*`);
};
