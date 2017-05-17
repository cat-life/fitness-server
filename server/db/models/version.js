import Sequelize from 'sequelize';
import sequelize from '../index';
import Project from './project';
import * as util from '../util';

const Version = sequelize().define('version', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    // unique: true,  // 添加此特性以后isUnique只能发挥作用而不能阻截
    validate: {
      notEmpty: true,
      isUnique: function(value, next) {
        return util.isUnique("version", ["name", "project_id"], this)(value, next);
      }
    }
  },
  desc: {
    type: Sequelize.STRING
  },
  enable_cache: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  project_id: {
    type: Sequelize.INTEGER
  },
  uid: {
    type: Sequelize.UUID
  },
  create_by: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});


Project.hasMany(Version, {
  foreignKey: 'project_id',
  constraints: false
});

Version.belongsTo(Project, {
  foreignKey: 'project_id',
  constraints: false,
  as: 'version'
});

Version.sync();

export default Version;
