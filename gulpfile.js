'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
const beautify = require('gulp-beautify')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const terser = require('gulp-terser')
const imagemin = require('gulp-imagemin')
const replace = require('gulp-replace')
sass.compiler = require('node-sass')

exports.sass = () => {
    return gulp.src('./resources/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(beautify.css())
    .pipe(gulp.dest('./public/css/'))
}

exports.js = () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/@popperjs/core/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/awesomplete/awesomplete.min.js',
        './resources/js/*.js'
    ])
    .pipe(babel({
        ignore: [
            './node_modules/',
        ],
        presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/js/'))
}

exports.img = () => {
    return gulp.src('./resources/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'))
}

// Cachebusting
exports.cacheBust = () => {
    return gulp.src('./views/**/*.ejs')
    .pipe(replace(/ver=\d+/g, 'ver=' + new Date().getTime()))
    .pipe(gulp.dest('./views/'))
}