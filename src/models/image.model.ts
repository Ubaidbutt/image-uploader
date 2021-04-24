import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Image = sequelize.define('images', {
    name: DataTypes.STRING,
    data: DataTypes.BLOB('long')
});

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Images table created`);
  })
  .catch((err) => {
      console.log('Error: ', err);
  });

export default Image;