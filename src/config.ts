import dotenv from 'dotenv';
dotenv.config();

const config = Object.freeze({
    // Replace your postgress URL here
    databaseUrl: process.env['POSTGRESQL_URL'] || 'postgres://postgres:qwerty123456@localhost:5432/images',
    webserverPort: process.env['WEBSERVER_PORT'] || 5000
});

export default config;