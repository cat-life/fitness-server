import gulp from 'gulp';
import rename from 'gulp-rename';
import config from 'config';
import runSequence from 'run-sequence';

gulp.task('copy:image', function() {
    return gulp.src(config.path.image.src + '/**/*') 
        .pipe(gulp.dest(config.path.image.dest));
});

gulp.task('static', function(callback) {
    runSequence(['copy:image'], callback);
});
