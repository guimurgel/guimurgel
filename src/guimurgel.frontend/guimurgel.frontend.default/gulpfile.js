/*
|--------------------------------------------------------------------------
| Gulpfile
|--------------------------------------------------------------------------
*/
const gulp = require("gulp");

//Plugins
const browserSync = require('browser-sync').create();
//const usemin = require('gulp-usemin');

//Helpers
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');

//Html
const fileinclude = require('gulp-file-include');
const htmlReplace = require('gulp-html-replace');
const header = require('gulp-header');

//Html - usemin
//const htmlmin = require('gulp-htmlmin');

//Css/Sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssComb = require('gulp-csscomb');
const cssmin = require('gulp-cssmin');

//Js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
//const jshintStylish = require('jshint-stylish');

//Js - usemin
//const minify = require('gulp-minifier');

//Images
const newer = require("gulp-newer");
const imagemin = require('gulp-imagemin');

//Del
const del = require('del');
const cache = require('gulp-cache');

//Server
//const msbuild = require("gulp-msbuild");
//const iisexpress = require('gulp-serve-iis-express');

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/
const paths = {
	html: {
		src: [
			'./src/views/*.html',
		],
		views: [
			'./src/views/**/*.html',
		],
		files: [
			'./src/*.html',
		],
		dest: {
			dev: [
				'./src'
			],
			prod: [
				'./dist'
			]
		}
	},
	sass: {
		src: [
			'./src/assets/sass/**/*.scss',
			'./src/assets/sass/styles.scss'
		],
		dest: [
			'./src/assets/css'
		]
	},
	js: {
		src: [
			'./src/assets/js/vendor/**/*.js',
			'./src/assets/js/core/**/*.js',
			'./src/assets/js/components/**/*.js',
			'./src/assets/js/controller/**/*.js',
		],
		files: [
			//Vendor
			// './src/assets/js/vendor/jquery-3.6.0.min.js',

			//System
			'./src/assets/js/core/_namespace.js',
			'./src/assets/js/core/_core.js',
			'./src/assets/js/components/**/*.js',
			'./src/assets/js/controller/**/*.js',
		],
		filesBuild: [
			//Vendor

			//System
			'./src/assets/js/core/_namespace.js',
			'./src/assets/js/core/_core.js',
			'./src/assets/js/components/**/*.js',
			'./src/assets/js/controller/**/*.js'
		],
		min: [
			'./dist/assets/js/scripts.js',
		],
		dest: {
			dev: [
				'./src/assets/js'
			],
			prod: [
				'./dist/assets/js'
			]
		}
	},
	del: {
		dist: './dist',
		css: './dist/assets/css',
		js: './dist/assets/js'
	},
	css: {
		src: [
			'./src/assets/css/*.css'
		],
		lint: [
			'./src/assets/css/**/*.css'
		],
		dest: {
			dev: [

			],
			prod: [
				'./dist/assets/css'
			]
		}
	},
	fonts: {
		src: [
			'./src/assets/fonts/**/*'
		],
		dest: {
			dev: [

			],
			prod: [
				'./dist/assets/fonts'
			]
		}
	},
	images: {
		src: [
			'./src/assets/img/**/*.+(png|jpg|gif|svg|mp4)'
		],
		dest: {
			dev: [

			],
			prod: [
				'./dist/assets/img'
			]
		}
	},
	json: {
		src: [
			'./src/assets/json/**/*'
		],
		dest: {
			dev: [

			],
			prod: [
				'./dist/assets/json'
			]
		}
	},
	server: {
		src: [
			'../AppPadrao.sln'
		],
		sources: [
			'Controllers/*.cs',
			'Helpers/*.cs',
			'ViewModel/**/*.cs'
		],
		views: [
			'Views/**/*.cshtml',
		],
		port: [
			'52425'
		]
	}
}

/*
|--------------------------------------------------------------------------
| Tarefas Gerais
|--------------------------------------------------------------------------
*/
function browserSyncInit () {

	browserSync.init({
		server: {
			baseDir: './src/',
			// proxy: "localhost:3000"
		}
	});

}

function watch () {

	//HTML
	gulp.watch(paths.html.views, gulp.series('htmlInclude'));
	gulp.watch('*.html').on('change', function (event) {
		console.log('Compilando HTML - ' + event);
	});

	//SASS
	gulp.watch(paths.sass.src, gulp.series([cleanCss, styles, css]));
	gulp.watch(paths.sass.src).on('change', function (event) {
		console.log('Compilando SASS - ' + event);	
	});

	//JS
	gulp.watch(paths.js.src, gulp.series([cleanJs, scripts, js]));
	gulp.watch(paths.js.src).on('change', function (event) {
		console.log('Compilando JS - ' + event);
	});

}

/*
|--------------------------------------------------------------------------
| Tarefas para Desenvolvimento
|--------------------------------------------------------------------------
*/
// Html
function htmlInclude () {
	return gulp
		.src(paths.html.src)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: './src/views/',
		}))
		.pipe(gulp.dest(paths.html.dest.dev))
		.pipe(notify('HTML Compilado'))
		.pipe(browserSync.stream());
}

// Sass
function styles () {
	return gulp
		.src(paths.sass.src, {allowEmpty: true})
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssComb())
		.pipe(gulp.dest(paths.sass.dest))
		.pipe(notify('SASS Compilado'))
		.pipe(browserSync.stream());
}

// Javascript
function scripts () {
	return gulp
		.src(paths.js.files, {allowEmpty: true})
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(paths.js.dest.dev))
		.pipe(notify('JavaScript Compilado'))
		.pipe(browserSync.stream());
}

function scriptsLint () {
	return gulp
		.src(paths.js.src, {allowEmpty: true})
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

/*
|--------------------------------------------------------------------------
| Tarefas de Build
|--------------------------------------------------------------------------
*/

// Clean dist folder
function cleanDist () {
	return del(paths.del.dist);
};

function cleanCss () {
	return del(paths.del.css);
};

function cleanJs () {
	return del(paths.del.js);
};

// Clear Cache
function cleanCache () {
	return cache.clearAll();
};

// Css
function css () {
	return gulp
		.src(paths.css.src, {allowEmpty: true})
		.pipe(plumber())
		.pipe(concat('styles.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(paths.css.dest.prod));
};

// Javascript
function concatScriptsFull () {
	return gulp
		.src(paths.js.filesBuild, {allowEmpty: true})
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['@babel/env'],
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest.prod));
}

function concatScriptsOthers () {
	return gulp
		.src(paths.js.min, { allowEmpty: true })
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(paths.js.dest.prod));
}

// Html
function html () {
	return gulp
		.src(paths.html.files)
		.pipe(header('\ufeff'))
		.pipe(htmlReplace({
			js: 'js/scripts.js',
			css: 'css/styles.css'
		}))
		.pipe(gulp.dest(paths.html.dest.prod));
};

// Fonts
function fonts () {
	return gulp
		.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest.prod))
};

// Images
function images () {
	return gulp
		.src(paths.images.src)
		//.pipe(newer(paths.images.dest.prod))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest.prod))
};

// Json
function json () {
	return gulp
		.src(paths.json.src)
		.pipe(gulp.dest(paths.json.dest.prod))
};

// Usemin - Concatena, Minifica, Replace HTML e coloca os prefixers dos arquivos JS e CSS
function usemin () {
	return gulp
		.src(paths.html.views)
		.pipe(plumber())
		.pipe(header('\ufeff'))
		.pipe(usemin({
			'html': [fileinclude],
			//'html' : [ htmlmin({ collapseWhitespace: true }) ],
			'js': [minify({
				minify: true,
				minifyJS: true,
			})],
			'css': [autoprefixer, cssmin]
		}))
		.pipe(gulp.dest(paths.html.dest.prod));
};

/*
|--------------------------------------------------------------------------
| Tarefas Server CS
|--------------------------------------------------------------------------
*/
function browserSyncInitCS () {
	browserSync.init({
		baseDir: 'content',
		proxy: 'http://localhost:' + paths.server.port,
		notify: false,
		ui: false
	});
};

function watchCS () {
	gulp.watch(paths.server.sources, gulp.series('buildVS'));
	return gulp.watch(paths.server.views, gulp.series('reload'));
};

function server () {
	var configPath = path.join(__dirname, '..\\.vs\\config\\applicationhost.config');
	iisexpress({
		siteNames: ['AppPadrao.Web'],
		configFile: configPath,
		port: paths.server.port
	});
};

function buildVS () {
	return gulp
		.src(paths.server.src)
		.pipe(plumber())
		.pipe(msbuild({
			toolsVersion: 'auto',
			logCommand: true
		}));
};

function reload () {
	browserSync.reload();
};

/*
|--------------------------------------------------------------------------
| Export Tasks
|--------------------------------------------------------------------------
*/

//Define complex tasks
const clean = gulp.series(cleanDist, cleanCache);
const js = gulp.series(concatScriptsFull, concatScriptsOthers);
const build = gulp.series(clean, htmlInclude, styles, scripts, gulp.parallel(css, js, html, fonts, images, json));
const buildusemin = gulp.series(clean, gulp.parallel(usemin, html, fonts, images, json));
const startcs = gulp.series(server, buildVS, gulp.parallel(browserSyncInitCS, watchCS));

//Export tasks
//Dev
exports.browserSyncInit = browserSyncInit;
exports.watch = watch;
exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.scriptsLint = scriptsLint;
exports.js = js;

//Prod
exports.build = build;
exports.buildusemin = buildusemin;
exports.clean = clean;

//Server
exports.startcs = startcs;

/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
*/
gulp.task('default', gulp.parallel(browserSyncInit, watch));
