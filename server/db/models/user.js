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
    // 0: 斤，1：公斤，2：磅
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  target: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  height: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  uid: {
    type: Sequelize.UUID
  }
}, {
  freezeTableName: true
});

User.sync();

export default User;
