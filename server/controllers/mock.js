import config from 'config';
import uuid from 'node-uuid';
import Controller from '../controller';
import Project from '../db/models/project';
import Version from '../db/models/version';
import Api from '../db/models/api';
import sequelize from '../db/index';
import queryString from 'query-string';
import Mock from 'mockjs';
import requestIp from 'request-ip';
import forward from '../extensions/forward';

export default class Main extends Controller {
  *index() {
    let query = queryString.parse(this.ctx.request.url.split('?')[1]);
    let req = this.ctx.request;
    let forwardQuery = {
      cookie: req.header.cookie ? req.header.cookie : '',
      method: this.ctx.method,
      ip: requestIp.getClientIp(req),
      body: req.body
    };

    // project 查询
    let project = yield Project.findOne({
      where: {
        name: query.project
      }
    });

    if (!project) {
      console.log('无对应项目');
      let result = yield forward(Object.assign({}, query, forwardQuery, {
        hasCache: false
      }));

      this.ctx.set('x-powered-by', 'redirect');
      this.ctx.type = result.type
      this.podata(result.body);
      return;
    }

    // version 查询
    let version = yield Version.findOne({
      where: {
        project_id: project.toJSON().id,
        name: query.version
      }
    });

    if (!version) {
      console.log('无对应版本');
      let result = yield forward(Object.assign({}, query, forwardQuery, {
        hasCache: false
      }));

      this.ctx.set('x-powered-by', 'redirect');
      this.ctx.type = result.type
      this.podata(result.body);
      return;
    }

    // api 查询
    let api = yield Api.findOne({
      where: {
        version_id: version.toJSON().id,
        name: query.api
      }
    });

    if (!api) {
      console.log('无对应 api');
      let result = yield forward(Object.assign({}, query, forwardQuery, {
        version_id: version.toJSON().id,
        hasCache: version.toJSON().enable_cache
      }));

      this.ctx.set('x-powered-by', 'redirect');
      this.ctx.type = result.type
      this.podata(result.body);
      return;
    } else {
      let content = api.toJSON().content;

      if (/^\{.*\}$/.test(content.replace(/(\s|\t|\r|\n)/g, ''))) {
        this.ctx.type = "application/json; charset=UTF-8";
        content = Mock.mock(content);
      } else {
        this.ctx.type = "text/html; charset=UTF-8";
        content = content.replace(/"/g, '').replace(/'/g, '"');
      }

      this.ctx.set('x-powered-by', 'mock');
      this.podata(content);
    } 
  }
}
