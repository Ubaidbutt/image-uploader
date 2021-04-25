import dotenv from 'dotenv';
dotenv.config();

const config = Object.freeze({
    // Replace your postgress URL here
    databaseUrl: process.env['POSTGRESQL_URL'] || '',
    webserverPort: process.env['WEBSERVER_PORT'] || null
});

export default config;