const BUILD_DIR = 'dist';
const SOURCE_DIR = 'src';
const PUBLIC_DIR = 'public';

export const config = {
	name: 'GFS',

	mode: {
		dev: !process.argv.includes('--production'),
		prod: process.argv.includes('--production'),
	},

	path: {
		src: {
			root: SOURCE_DIR,
			pages: `${SOURCE_DIR}/*.html`,
			fonts: `${SOURCE_DIR}/assets/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}`,
			icons: `${SOURCE_DIR}/assets/icons/*.svg`,
			images: `${SOURCE_DIR}/assets/images/**/*.{png,jpg,svg,webp,avif,gif}`,
			public: `${PUBLIC_DIR}/**/*.*`,
			styles: `${SOURCE_DIR}/assets/styles/main.css`,
			scripts: `${SOURCE_DIR}/assets/scripts/main.js`,
		},
		dest: {
			root: BUILD_DIR,
			pages: `${BUILD_DIR}/`,
			fonts: `${BUILD_DIR}/assets/fonts`,
			icons: `${BUILD_DIR}/assets/icons`,
			images: `${BUILD_DIR}/assets/images`,
			public: `${BUILD_DIR}/`,
			styles: `${BUILD_DIR}/assets/styles`,
			scripts: `${BUILD_DIR}/assets/scripts`,
		},
		watch: {
			root: SOURCE_DIR,
			pages: `${SOURCE_DIR}/**/*.html`,
			fonts: `${SOURCE_DIR}/assets/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}`,
			icons: `${SOURCE_DIR}/assets/icons/*.svg`,
			images: `${SOURCE_DIR}/assets/images/**/*.{png,jpg,svg,webp,avif,gif}`,
			styles: `${SOURCE_DIR}/assets/styles/**/*.css`,
			scripts: `${SOURCE_DIR}/assets/scripts/**/*.{js,mjs}`,
		},
		public: {
			root: PUBLIC_DIR,
		},
	},
};
