import config from 'config';
import uuid from 'node-uuid';
import Controller from '../controller';
import User from '../db/models/user';
import sequelize from '../db/index';
import queryString from 'query-string';

export default class Main extends Controller {
    *list(name) {
      let list = yield User.findAll({where: {
      }});
      this.podata({
        data: list
      });
    }

    *get(id) {
      let project = yield User.findOne({where: {
        id
      }})
      this.podata({data: project});
    }

    *create() {
      let query = queryString.parse(this.ctx.request.url.split('?')[1]);
      query.uid = uuid.v1();

      try {
        let action = yield User.create(query);
        this.podata({data: action});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }

    *update(id) {
      let query = queryString.parse(this.ctx.request.url.split('?')[1]);

      try {
        let action = yield User.update(query, { where: {
          id
        }});
        this.podata({data: action});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }

    *delete(id) {
      try {
        let action = yield User.update({is_deleted: true}, { where: {
          id
        }});
        this.podata({data: action});
      } catch(ex) {
        console.log(ex);
        this.podata(ex);
      }
    }
}
