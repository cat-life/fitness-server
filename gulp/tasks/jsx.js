/*
 *  处理js文件
 * */
import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';

import webpackConfig from '../webpack.config.js';

let loaded = 0; // 用来处理重复打包的偶现问题
let engineWebpack = function(config, callback) {
    webpack(config, (err, status) => {
        gutil.log("[webpack]", status.toString({}));
        loaded ++;
        if (loaded <= 1) {
            callback();
        }
    });
}

gulp.task('jsx:pack', (callback) => {
    engineWebpack(webpackConfig, callback);
});

gulp.task('jsx:dev', (callback) => {
    engineWebpack(Object.assign({watch: true, devtool: 'source-map'}, webpackConfig), callback);
});
