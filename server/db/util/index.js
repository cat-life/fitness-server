import sequelize from '../index';

export const isUnique = (model, key, instance) => {
  return (value, next) => {
    let Model = require('../models/' + model);
    let query = {};
    if (typeof key === 'string') {
      query[key] = value;
    } else {
      let obj = instance.toJSON();
      key.forEach((item) => {
        query[item] = obj[item];
      });
    }

    Model.findOne({where: query}).then(function(obj) {
      if (obj && obj.id != instance.id) {
        next(key + ': ' + value + ' is in use');
      } else {
        next();
      }
    });
  }
}

export const addColumn = (tableName, columnName, dataType) => {
  return sequelize.getQueryInterface().addColumn(tableName, columnName, dataType);
}

export const delColumn = (tableName, columnName, dataType) => {
  return sequelize.getQueryInterface().removeColumn(tableName, columnName, dataType);
}

export const moveColumn = (tableName, columnName, dataType) => {
  return sequelize.getQueryInterface().changeColumn(tableName, columnName, dataType);
}
