/*  
    Para o padrão, compilar o SASS e watch apenas escreva "gulp"
    para a versão final do CSS escreva "gulp dist"
*/


class Gulp {
  constructor() {
      this.self = require("gulp");
      this.sass = require("gulp-sass");
      this.sourcemaps = require("gulp-sourcemaps");
      this.autoprefixer = require("gulp-autoprefixer");
      this.cssmin = require("gulp-clean-css");
      this.rename = require("gulp-rename");
      this.uglify = require("gulp-uglify");
      this.babel = require("gulp-babel");
      this.concat = require("gulp-concat");
      this.errorHandle = require("gulp-error-handle");


      this.gulpCss();
      this.gulpWatch();
  };

  gulpWatch() {
      this.self.task("watch:css", () => this.self.watch(`css/*.scss`, ["css"]));

      this.self.task("default", [
          "css",
          "watch:css",
      ]);
  };

  gulpCss() {
      this.self.task("css", () => {
          return this.self.src(`css/admin.scss`)
              .pipe(this.sourcemaps.init())
              .pipe(this.sass())
              .on('error', err => {
                  console.log("ERRO NO SASS");
                  console.error(`Arquivo: ${err.relativePath}`);
                  console.log(`Linha: ${err.line}`);
                  console.log(`Erro: ${err.messageOriginal}`);
              })
              .pipe(this.autoprefixer({
                  browsers: [
                      'ie 9-11',
                      '> 5%',
                      'last 10 versions'
                  ],
                  cascade: true
              }))
              .pipe(this.sourcemaps.write())
              .pipe(this.self.dest(`css/`))
              .pipe(this.cssmin({
                  debug: true,
              }, details => {
                  console.log("CSS Parent Minify");
                  console.log(`Source: ${(details.stats.originalSize/1024).toFixed(2)} Kb`);
                  console.log(`Minify: ${(details.stats.minifiedSize/1024).toFixed(2)} Kb`);
              }))
              .pipe(this.rename({
                  suffix: ".min"
              }))
              .pipe(this.self.dest(`css/`))
      });

  };

  
}

new Gulp();
