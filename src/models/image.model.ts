import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Image = sequelize.define('images', {
  id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true},
  name: DataTypes.STRING,
  data: DataTypes.BLOB
});

export default Image;