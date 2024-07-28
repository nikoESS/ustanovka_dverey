const gulp = require('gulp')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
// Используйте require для gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        // Добавьте настройки MIME-типов для CSS и JavaScript файлов
        files: ["src/**/*.html", "src/css/*.css", "src/js/*.js"], // Пути к файлам, за изменениями которых нужно следить
        serveStatic: ['.', './src'],
        serveStaticOptions: {
            extensions: ['html', 'css', 'js']
        },
        // Добавьте инъекцию изменений CSS
        injectChanges: true
    });

    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('styles', function(){
    return gulp.src("src/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe (rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
                }))
            .pipe(cleanCSS({compatibility: '1e8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
})

gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"))
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default',gulp.parallel('watch', 'server', 'styles'));