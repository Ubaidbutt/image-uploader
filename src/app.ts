import express, {Application, Request, Response} from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

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
app.use(helmet());

app.use('/images', imageRouter);
app.use((req: Request, res: Response) => res.status(404).send('Not found'));

sequelize.authenticate()
    .then(async () => {
        console.log('Postgresql connection created');
        await sequelize.sync({force: true});
        app.listen(PORT, () => console.log(`The web server is up and listening at PORT ${PORT}`));
        app.emit('serverStarted'); // This event is used to make sure mocha test runs after server starts running.
    })
    .catch((err) => console.log('Error in database connection: ', err));

export default app;