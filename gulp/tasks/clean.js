import gulp from 'gulp';
import config from 'config';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';

gulp.task('clean:css', () => {
    return gulp.src(config.path.css.dest, {read: false})
        .pipe(clean({force: true}));
});


gulp.task('clean:image', () => {
    return gulp.src(config.path.image.dest, {read: false})
        .pipe(clean({force: true}));
});


gulp.task('clean:font', () => {
    return gulp.src(config.path.fonts.dest, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean:js', () => {
    return gulp.src(config.path.js.dest, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean', (callback) => {
    runSequence('clean:css', 'clean:image', 'clean:font', 'clean:js', callback);
});
