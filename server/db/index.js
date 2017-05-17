import Sequelize from 'sequelize';
import config from 'config';

const { dbConfig } = config;

export default function() {
  let sequelize = new Sequelize(dbConfig.db_name, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      timezone: '+08:00',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: function(str) {}
  });
  return sequelize;
};
