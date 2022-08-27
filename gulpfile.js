const {src, dest, parallel, watch, series} = require('gulp'),
      sass = require('gulp-sass')(require('sass')),
      rename = require('gulp-rename'),
      browsersync = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      cssmin = require('gulp-cssmin'),
      imagemin = require('gulp-imagemin'),
      fileInclude = require('gulp-file-include'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      babelify = require('babelify'),
      sourcemaps = require('gulp-sourcemaps')

      
// сбор css фалов библиотек в один файл 

const cssLibsMinify = () => {
  return src([
    // 'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    // 'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
    // 'node_modules/rateyo/lib/cjs/rateyo.css'
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(dest('dist/css'))
}

// сбор js фалов библиотек в один файл 

const jsLibsMinify = () => {
  return src([
    'node_modules/slick-carousel/slick/slick.js',
    // 'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
    // 'node_modules/rateyo/lib/cjs/rateyo.min.js',
    // 'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/inputmask/dist/jquery.inputmask.min.js',
    // 'node_modules/dotdotdot-js/dist/dotdotdot.js',
    'node_modules/wowjs/dist/wow.min.js',
    'node_modules/jquery-validation/dist/jquery.validate.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}


// конвертация scss файлов в css с их сжатием в итоговую папку и перезагрузкой страницы

const sassConvert = () => {
  return src('#src/scss/**/*')
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(rename({ suffix: ".min" }))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 8 versions'] }))
      .pipe(dest('dist/css'))
      .pipe(browsersync.reload({ stream: true }))
}

// обновление js файла, его сжатие и передача его в папку проекта 

const minifyJS = function() {
  return browserify({ 
    entries: '#src/js/main.js', 
    debug: true
  })
  .transform(babelify, { presets: ['@babel/env'], sourceMaps: true })
  .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/js/'))
    .pipe(browsersync.reload({ stream: true }))
}

const imageMin = () => {
  return src('#src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest('dist/images'))
}


// Перенос файлов шрифтов

const carryFonts = () => {
  return src('#src/fonts/*')
      .pipe(dest('dist/fonts'))
}


// задача перезгрузки страницы

const initBrowserSync = () => {
  browsersync.init({
      server: {
          baseDir: "dist/"
      }
  })
}

const htmlInclude = () => {
  return src(['#src/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist/'))
    .pipe(browsersync.reload( {stream: true} ))
}

// эта задача - следит за изменениями в файлах style.scss, .html, .js и одновременно обновляет страницу

const watchFiles = () => {
  watch('#src/scss/*.scss', sassConvert)
  watch('#src/*.html', htmlInclude)
  watch('#src/html-parts/*.html', htmlInclude)
  watch('#src/js/**/*.js', minifyJS)
  watch('#src/images/**/*', imageMin)
  watch('#src/fonts/*', carryFonts)
}


exports.default = parallel(minifyJS, imageMin, sassConvert, carryFonts, initBrowserSync, htmlInclude, watchFiles)
exports.minifyAllLibs = parallel(cssLibsMinify, jsLibsMinify)