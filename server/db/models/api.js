import Sequelize from 'sequelize';
import sequelize from '../index';
import Version from './version';
import * as util from '../util';

const Api = sequelize().define('api', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    // unique: true,
    validate: {
      notEmpty: true,
      isUnique: function(value, next) {
        return util.isUnique("api", ["name", "version_id"], this)(value, next);
      }
    }
  },
  desc: {
    type: Sequelize.STRING
  },
  method: {
    type: Sequelize.STRING
  },
  from_cache: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  version_id: {
    type: Sequelize.INTEGER
  },
  content: {
    type: Sequelize.TEXT('long')
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

Version.hasMany(Api, {
  foreignKey: 'version_id',
  constraints: false
});

Api.belongsTo(Version, {
  foreignKey: 'version_id',
  constraints: false,
  as: 'api'
});

Api.sync();

export default Api;
