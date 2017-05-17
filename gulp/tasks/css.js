import gulp from 'gulp';
import config from 'config';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import scss from 'postcss-scss';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sprites from 'postcss-sprites';
import fs from 'fs';

const cssPath = config.path.css;
const opts = {
    stylesheetPath: cssPath.dest,
    spritePath: config.path.image.dest + '/sp',
    retina: true
};

gulp.task('at2x', () => {
    let css = fs.readFileSync(cssPath.src + '/common/icon.scss', 'utf8');
    css = "@media only screen and (-webkit-min-device-pixel-ratio: 1.5), not all, not all, not all {" + css + "}";

    return fs.writeFileSync(cssPath.src + '/common/icon_2x.scss', css.replace(/\.png/g, '@2x\.png'));
});

gulp.task('sass', () => {
    return gulp.src(cssPath.src + '/base.scss')
        .pipe(postcss([
            precss,
            autoprefixer,
            sprites(opts)
        ], {
            syntax: scss
        }))
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest(cssPath.dest));
});
