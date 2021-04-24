import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Image = sequelize.define('images', {
  id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
  name: DataTypes.STRING,
  data: DataTypes.BLOB
});

(async () => {
  await sequelize.sync({force: true});
})();

export default Image;