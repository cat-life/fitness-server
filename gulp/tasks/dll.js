/*
 *  处理js文件
 *  dll 指令单独执行，因为连续执行的时候，其实是用的之前的 manifest
 * */
import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';

import webpackDllConfig from '../webpack.dll.config.js';

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

gulp.task('dll:pack', (callback) => {
    callback();
});

gulp.task('dll:dev', (callback) => {
    engineWebpack(webpackDllConfig, callback);
});
