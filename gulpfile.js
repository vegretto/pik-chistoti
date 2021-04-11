const {src, dest, watch, parallel, series} = require('gulp');
const pug = require('gulp-pug');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');

function views() {
    return src('src/views/pages/*.pug')
        .pipe(pug({pretty: '\t'}))
        .pipe(dest('src/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/styles/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            grid: 'autoplace'
        }))
        .pipe(concat('style.min.css'))
        .pipe(dest('src/styles'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/swiper/swiper-bundle.js',
        'node_modules/lazysizes/lazysizes.js',
        'node_modules/imask/dist/imask.js',
        'src/scripts/vendor/jquery.fancybox.js',
        'src/scripts/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('src/scripts'))
        .pipe(browserSync.stream())
}


function devImages() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(imagemin())
        .pipe(dest('src/img'))
}

function devToWebp() {
    return src('src/img/*')
        .pipe(webp([{
            quality: 100,
            lossless: true,
        }]))
        .pipe(dest('src/img'))
}

function devSprite() {
    return src(['src/img/svg/*.svg'])
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUselessDefs: false },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(concat('sprite.svg'))
        .pipe(dest('src/img/svg'));
}


function images() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

function toWebp() {
    return src('src/img/*')
        .pipe(webp([{
            quality: 100,
            lossless: true,
        }]))
        .pipe(dest('dist/img'))
}

function sprite() {
    return src(['src/img/svg/*.svg'])
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUselessDefs: false },
                    { cleanupIDs: false }
                    ]
            })
        ]))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(concat('sprite.svg'))
        .pipe(dest('dist/img/svg'));
}

function watcher() {
    watch(['src/views/**/*.pug'], views);
    watch(['src/styles/**/*.scss'], styles);
    watch(['src/scripts/main.js'], scripts);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir : 'src/'
        }
    });
}

function cleandist() {
    return del('dist')
}

function copytodist () {
    return src([
        'src/**/*.html',
        'src/styles/style.min.css',
        'src/scripts/main.min.js',
        'src/fonts/**/*',
    ], {base: 'src'})
        .pipe(dest('dist'))
}

exports.views = views;
exports.styles = styles;
exports.scripts = scripts;
exports.watcher = watcher;
exports.browsersync = browsersync;
exports.images = images;
exports.toWebp = toWebp;
exports.sprite = sprite;
exports.cleandist = cleandist;
exports.copytodist = copytodist;

exports.default = parallel(views, styles, scripts, browsersync, watcher)
exports.devpics = series(devToWebp, devSprite)
exports.build = series(cleandist, images, sprite, copytodist)
