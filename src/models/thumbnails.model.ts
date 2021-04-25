import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Thumbnail = sequelize.define('thumbnails', {
  id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true},
  thumbnail200: DataTypes.BLOB,
  thumbnail300: DataTypes.BLOB,
  imageId: {type: DataTypes.INTEGER, unique: true}
});

export default Thumbnail;