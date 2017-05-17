import request from 'superagent';
import Api from '../db/models/api';
import uuid from 'node-uuid';

export default  function *forWard (option) {
  // 暂时不添加白名单和 http/https 处理

  let result;

  option.method = option.method.toUpperCase();
  if (option.qs[0] !== '?') {option.qs = '?' + option.qs;}
  let url = `${option.server}/${option.api}${option.qs}`;
  let server = option.server.split('//')[1];  // 需要分离

  switch (option.method) {
    case 'POST':
      result = yield request.post(url)
        .set('cookie', cookie)
        .set('Host', server)
        .send(option.body);
      break;
    case 'PUT':
      result = yield request.put(url)
        .set('cookie', cookie)
        .set('Host', server)
        .send(option.body);
      break;
    case 'DELETE':
      result = yield request.del(url)
        .set('cookie', cookie)
        .set('Host', server);
      break;
    default:
      result = yield request.get(url)
        .set('cookie', option.cookie)
        .set('Host', server);
  }

  if (result.res && result.res.text) {
    if (option.hasCache) {
      try{
        yield Api.create({
          name: option.api,
          content: result.res.text,  //JSON.stringify(result.res.text),
          from_cache: true,
          uid: uuid.v1(),
          method: option.method,
          version_id: option.version_id,
          create_by: 'roobot'
        });
      } catch (ex) {
        console.log(ex);
      }
    }
    return {
      type: result.res.headers['content-type'],
      body: result.res.text
    }
  } else {
    return {};
  }
}

