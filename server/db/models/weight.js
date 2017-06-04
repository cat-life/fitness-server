import Sequelize from 'sequelize';
import sequelize from '../index';
import User from './user';
import * as util from '../util';

const Weight = sequelize().define('weight', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  time: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.INTEGER
  },
  BMI: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  uid: {
    type: Sequelize.UUID
  },
}, {
  freezeTableName: true
});


User.hasMany(Weight, {
  foreignKey: 'user_id',
  constraints: false
});

Weight.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
  as: 'version'
});

Weight.sync();

export default Weight;
