import Sequelize from 'sequelize';
import sequelize from '../index';
import * as util from '../util';

const Project = sequelize().define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isUnique: function(value, next) {
        return util.isUnique("project", "name", this)(value, next);
      }
    }
  },
  desc: {
    type: Sequelize.STRING
  },
  api: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },
  uid: {
    type: Sequelize.UUID
  },
  create_by: {
    type: Sequelize.STRING
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
});

Project.sync();

export default Project;
