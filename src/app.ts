import express, {Application, Request, Response} from 'express';
import bodyParser = require('body-parser');

import sequelize from './dbConnection';
import config from './config';
import imageRouter from './routers/images.router';


const app: Application = express();
const PORT = config.webserverPort;
// Test route
app.all('/', (req: Request, res: Response) => {
    return res.send('OK');
});

app.use(bodyParser.json());

app.use('/images', imageRouter);

sequelize.authenticate()
    .then(() => {
        console.log('Sequelize connection created');
        app.listen(PORT, () => console.log(`The web server is up and listening at PORT ${PORT}`));
    })
    .catch((err) => console.log('Error in database connection: ', err));

export default app;