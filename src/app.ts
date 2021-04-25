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
    .then(async () => {
        console.log('Sequelize connection created');
        await sequelize.sync({force: true});
        app.listen(PORT, () => console.log(`The web server is up and listening at PORT ${PORT}`));
        app.emit('serverStarted');
    })
    .catch((err) => console.log('Error in database connection: ', err));

process.on('uncaughtException', (error) => {
    console.log('Error: ', error);
})

export default app;