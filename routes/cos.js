const router = require('koa-router')()
const COS = require('cos-nodejs-sdk-v5');
var fs = require('fs');
var path = require('path');

router.prefix('/cos')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a cos response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = {
    data: {
      name: 'bar'
    },
    status: 1
  }
})

/*
 *  demo: https://github.com/tencentyun/cos-nodejs-sdk-v5/blob/master/demo/demo.js
 */
var params = {
  AppId: '1253837476',
  //Bucket: 'meowlife',
  SecretId: 'AKIDZ4PYadDL0Vr3BJdTPAlBPdw881sZkPah',
  SecretKey: 'HOJ2Z4RioiQ3Xpx772tZ5Wr35ypUzJUw',
};
var cos = new COS(params);

router.post('/auth/:key', function (ctx, next) {
  var auth = cos.getAuth({
    Method: 'get',
    Key: ctx.params.key
  });

  ctx.body = {
    data: {
      auth
    }
  };
});

router.get('/auth/check', function (ctx, next) {
  var filepath2 = path.resolve(__dirname, '1mb.out2.zip');
  cos.getObject({
    Bucket: 'meowlife',
    Region: 'ap-beijing',
    Key: 'user-images/test123.png',
    // Output: fs.createWriteStream(filepath2),
    onProgress: function (progressData) {
      console.log(JSON.stringify(progressData));
    }
  }, function (err, data) {
    console.log(err || data);
  });
  console.log('-------', cos);
  ctx.body = {
    data: 1
  }
})

module.exports = router
