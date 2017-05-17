import gulp from 'gulp';
import config from 'config';

gulp.task('watch:css', () => {
    return gulp.watch(config.path.css.src + '/**/*', ['sass']);
});
