import * as util from '../util'; 
import Sequelize from 'sequelize';

util.addColumn('project', 'is_deleted', Sequelize.BOOLEAN);
