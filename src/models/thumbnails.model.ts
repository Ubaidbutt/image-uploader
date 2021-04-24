import sequelize from '../dbConnection';
import {DataTypes} from 'sequelize';

const Thumbnail = sequelize.define('thumbnails', {
    thumbnail200: DataTypes.BLOB('long'),
    thumbnail300: DataTypes.BLOB('long'),
    imageId: DataTypes.INTEGER
});

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Thumbnail table created`);
  })
  .catch((err) => {
      console.log('Error: ', err);
  });

export default Thumbnail;