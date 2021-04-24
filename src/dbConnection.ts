import {Sequelize} from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.databaseUrl);

export default sequelize;