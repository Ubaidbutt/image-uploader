import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Thumbnail = sequelize.define('thumbnails', {
  id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
  thumbnail200: DataTypes.BLOB('long'),
  thumbnail300: DataTypes.BLOB('long'),
  imageId: DataTypes.INTEGER
});

(async () => {
  await sequelize.sync({force: true});
})();

export default Thumbnail;