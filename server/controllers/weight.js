import config from 'config';
import uuid from 'node-uuid';
import Controller from '../controller';
import Weight from '../db/models/Weight';
import Api from '../db/models/api';
import sequelize from '../db/index';
import queryString from 'query-string';

export default class Main extends Controller {
    *list(userId) {
      let list = yield Weight.findAll({where: {
        user_id: userId
      }});
      this.podata({
        data: list
      });
    }

    *get(userId, time) {
      let version = yield Version.findOne({where: {
        time,
        user_id: userId
      }})
      this.podata({data: version});
    }

    *create(userId, time) {
      let query = queryString.parse(this.ctx.request.url.split('?')[1]);
      query.uid = uuid.v1();
      query.user_id = userId - 0;

      try {
        let action = yield Weight.create(query);
        this.podata({data: action});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }

    *update(userId, time) {
      let query = queryString.parse(this.ctx.request.url.split('?')[1]);

      try {
        let action = yield Version.update(query, { where: {
          time,
          user_id: userId
        }});
        this.podata({data: action});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }

    *copy(projectId, versionId) {
      let version = yield Version.findOne({where: {id: versionId}});
      let apis = yield Api.findAll({where: {version_id: versionId}});
      let newObj = version.toJSON();

      newObj.uid = uuid.v1();
      newObj.name = newObj.name + '_bac';
      delete(newObj.id);
      delete(newObj.createdAt);
      delete(newObj.updatedAt);

      let newVersion;
      try {
         newVersion = yield Version.create(newObj);
      } catch (ex) {
        this.podata(ex);
        return;
      }
      let newVersionId = newVersion.toJSON().id;

      for (let i = 0, len = apis.length; i < len; i ++) {
        let newObj = apis[i].toJSON();
        newObj.uid = uuid.v1();
        newObj.version_id = newVersionId;
        delete(newObj.id);
        delete(newObj.createdAt);
        delete(newObj.updatedAt);

        let newApi = yield Api.create(newObj);
      }

      this.podata({data: newVersion});
    }

    *delete(userId, time) {
      try {
        let v = yield Version.destroy({ where: {
          time,
          user_id: userId
        }});
        /*
        let a = yield Api.destroy({where: {
          version_id: versionId
        }});
        */
        this.podata({data: {v, a}});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }
}
