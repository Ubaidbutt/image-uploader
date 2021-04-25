import {Sequelize} from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.databaseUrl, {pool: {max: 5, min: 0, idle: 10}, logging: false});

export default sequelize;