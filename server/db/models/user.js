import Sequelize from 'sequelize';
import sequelize from '../index';
import * as util from '../util';

const User = sequelize().define('user', {
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
        return util.isUnique("user", "name", this)(value, next);
      }
    }
  },
  unit: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },
  target: {
    type: Sequelize.INTEGER
  },
  age: {
    type: Sequelize.INTEGER
  },
  height: {
    type: Sequelize.INTEGER
  },
  uid: {
    type: Sequelize.UUID
  }
}, {
  freezeTableName: true
});

User.sync();

export default User;
