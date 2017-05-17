import request from 'superagent';

request.Request.prototype.csrf = function() {
    let metas = document.getElementsByTagName('meta');
    let slice = Array.prototype.slice;
    let self = this;

    slice.call(metas).filter((meta) => {
        return ~['csrf', 'timestamp'].indexOf(meta.name);
    }).forEach((meta) => {
        self.set(meta.name, meta.content);
    });

    return self;
}

request.Request.prototype.promiseify = function() {
    const self = this;

    return new Promise((resolve, reject) => {
        self.end((err, res) => {
            if (err) {
                // 本系统的逻辑受 server 端影响，reject 也设置为返回 res 以供前端逻辑处理
                return reject(res);
            }

            resolve(res);
        });
    });
}

export default request;
