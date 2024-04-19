const { src, dest, watch, parallel } = require("gulp");

// Dependencias CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

const sourcemaps = require("gulp-sourcemaps");

// Dependencias IMG
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JS
const terser = require("gulp-terser-js");


// Declaracion de la tarea
function css( callback ){

    src("src/scss/**/*.scss")   // Identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe( plumber() )          // Compilar plumber 
    .pipe( sass() )             // Compilar el archivo SASS
    .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
    .pipe( sourcemaps.write("."))
    .pipe( dest("build/css") ); // Almacena en disco duro


    callback(); // Avisa a gulp que llegamos al final
}

function javascript( callback ){
    src("src/js/**/*.js")
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe( sourcemaps.write("."))
    .pipe(dest("build/js"));

    callback();
}

function dev( callback ){
    watch("src/scss/**/*.scss", css); // Cada vez que guarde "app.scss" ejecuto la tarea "css"
    watch("src/js/**/*.js", javascript);

    callback();
}

function versionWebp( callback ){

    const opciones = {
        quality:50
    }

    src("img/**/*.{png,jpg}")
    .pipe( webp( opciones ) )
    .pipe( dest( "build/img" ) )

    callback();
}

function imagenes( callback ){
    const opciones = {
        optimizationLevel: 3
    }

    src("img/**/*.{png,jpg}")
    .pipe( cache( imagemin( opciones ) ) )
    .pipe( dest( "build/img" ) )

    callback();
}

function versionAvif( callback ){

    const opciones = {
        quality:50
    }

    src("img/**/*.{png,jpg}")
    .pipe( avif( opciones ) )
    .pipe( dest( "build/img" ) )

    callback();
}

// Llamado a la tarea
exports.css = css;  // La izquierda es un nick, la derecha es el nombre de la func.
exports.dev = parallel(javascript, dev);
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.javascript = javascript;

exports.default = css;