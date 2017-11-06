const router = require('koa-router')()
const COS = require('cos-nodejs-sdk-v5');
var fs = require('fs');
var path = require('path');

router.prefix('/cos')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a cos response!'
})

/*
 *  demo: https://github.com/tencentyun/cos-nodejs-sdk-v5/blob/master/demo/demo.js
 */
const COS_ID = {
  AppId: '1253837476',
  //Bucket: 'meowlife',
  SecretId: 'AKIDZ4PYadDL0Vr3BJdTPAlBPdw881sZkPah',
  SecretKey: 'HOJ2Z4RioiQ3Xpx772tZ5Wr35ypUzJUw',
};
const COS_CONFIG = {
  Bucket: 'meowlife',
  Region: 'ap-beijing',
  RegionSimple: 'bj'
};
let cos = new COS(COS_ID);
let unique_id = 0;
const getKey = () => {
  return '_cos_img_' + unique_id + (new Date()).getTime();
}

// 获取权限接口
router.post('/auth/:key', function (ctx, next) {
  var auth = cos.getAuth({
  });
  ctx.body = {
    data: {
      auth
    }, ret: 1
  };
});

const putObject = function(fileObj, param) {
  return new Promise(function (resolve, reject) {
    let file = fs.readFileSync(fileObj.path);
    let filename = param.setPath + '/' + getKey();
    cos.putObject({
      Bucket: COS_CONFIG.Bucket,
      Region: COS_CONFIG.Region,
      Key: filename,  // 必须
      TaskReady: function (tid) {
        TaskId = tid;
      },
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      },
      Body: file,
      ContentLength: fileObj.size
    }, function (err, data) {
      if (err) reject(err);
      if (data) resolve({
        data,
        imgUrl: 'https://' + COS_CONFIG.Bucket + '-' + COS_ID.AppId + '.cos' + COS_CONFIG.RegionSimple + '.myqcloud.com/' + filename
      });
    });
  });
}

router.post('/upload', async (ctx, next) => {
  let bodyData = ctx.request.body;
  let res = await putObject(bodyData.files.file, bodyData.fields);

  ctx.body = {
    data: res,
    ret: 1
  }
})

router.get('/auth/check', function (ctx, next) {
  var filepath2 = path.resolve(__dirname, '1mb.out2.zip');
  cos.getObject({
    Bucket: COS_CONFIG.Bucket,
    Region: COS_CONFIG.Region,
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
