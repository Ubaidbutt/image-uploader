import {
    describe, it, before
} from 'mocha';

import Image from '../models/image.model';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

import app from '../app';

chai.use(chaiHttp);

describe('Get all images', async () => {
    before(async () => {
        await Image.destroy({
            where: {},
            truncate: true
          });
    });

    it('should return an array', async () => {
        try {
            const response = await chai.request(app).get('/images');
            response.should.have.status(200);
            response.body.images.should.be.an('array');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('should return 404 error if the image ID does not exist', async () => {
        try {
            const response = await chai.request(app).get('/images/1');
            response.should.have.status(404);
        } catch(err) {
            throw new Error(err);
        }
    });

    it('should store the image in the database', async () => {
        try {
            const response = await chai.request(app).post('/images')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .field('fileName', 'ubaid.jpg')
                .attach('files', "ubaid.png")
            response.should.have.status(201);
        } catch(err) {
            throw new Error(err);
        }
    });
});