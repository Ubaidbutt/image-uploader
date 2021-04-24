import {Sequelize} from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.databaseUrl, {logging: false});

export default sequelize;