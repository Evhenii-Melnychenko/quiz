const { src, dest, watch, series, parallel, lastRun } = require('gulp');

const autoprefixer = require('autoprefixer');
const browser = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const html = require('gulp-htmlmin');
const mmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass');
const sassCompiler = require('sass');
const sass = gulpSass(sassCompiler);
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const sharpResponsive = require('gulp-sharp-responsive');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config');
const { path, directories } = require('./pathes');

const isDev = !process.argv.includes('--prod');

console.log('development', isDev);

/* =========================
   JS
========================= */
function js() {
  return src(path.js.src, { since: lastRun(js) })
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig(isDev, directories)))
    .pipe(dest(isDev ? path.js.dev : path.js.public))
    .pipe(gulpif(isDev, browser.stream()));
}

/* =========================
   MOVE LIBS
========================= */
function moveLibFolder() {
  return src(path.js.srcLib)
    .pipe(dest(isDev ? path.js.devLib : path.js.publicLib));
}

/* =========================
   CSS
========================= */
function css() {
  const output = isDev ? path.css.dev : path.css.public;

  return src(path.css.src)
    .pipe(plumber())
    .pipe(cached('css'))
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(mmq())
    .pipe(
      postcss(
        isDev
          ? [autoprefixer(), require('webp-in-css/plugin')]
          : [autoprefixer(), cssnano()]
      )
    )
    .pipe(gulpif(isDev, sourcemaps.write('.')))
    .pipe(remember('css'))
    .pipe(dest(output))
    .pipe(gulpif(isDev, browser.stream()));
}

/* =========================
   IMAGES
========================= */
function images() {
  const output = isDev ? path.images.dev : path.images.public;

  return src(path.images.src)
    .pipe(plumber())
    .pipe(newer(output))
    .pipe(
      sharpResponsive({
        formats: [
          { format: 'jpeg', quality: 82, rename: { extname: '.jpg' } },
          { format: 'png', compressionLevel: 9 }
        ]
      })
    )
    .pipe(dest(output))
    .pipe(webp())
    .pipe(dest(output));
}

/* =========================
   FONTS
========================= */
function fonts() {
  const output = isDev ? path.fonts.dev : path.fonts.public;

  return src(path.fonts.src)
    .pipe(newer(output))
    .pipe(dest(output));
}

/* =========================
   HTML
========================= */
function htmlTask() {
  return src(path.html.src, { since: lastRun(htmlTask) })
    .pipe(gulpif(!isDev, html({ collapseWhitespace: true })))
    .pipe(dest(isDev ? path.html.dev : path.html.public))
    .pipe(browser.stream());
}

/* =========================
   CLEAN
========================= */
function clean() {
  return del([directories.dev]);
}

/* =========================
   SERVER
========================= */
function server() {
  browser.init({
    server: directories.dev,
    notify: false,
    open: false
  });
}

/* =========================
   WATCH
========================= */
function watcher() {
  watch(path.css.watcher, css)
    .on('unlink', (filepath) => {
      delete cached.caches.css[filepath];
      remember.forget('css', filepath);
    });

  watch(path.js.watcher, js);
  watch(path.html.src, htmlTask);
  watch(path.images.watcher, images);
}

/* =========================
   BUILD
========================= */
const build = series(
  clean,
  parallel(htmlTask, js, moveLibFolder, css, images, fonts)
);

const dev = series(
  build,
  parallel(server, watcher)
);

exports.default = isDev ? dev : build;