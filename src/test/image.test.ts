import {
    describe, it, before
} from 'mocha';

import fs from 'fs';
import path from 'path';

import Image from '../models/image.model';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

import app from '../app';

chai.use(chaiHttp);

describe('Image API route', async () => {
    before(async () => {
        await Image.destroy({
            where: {},
            truncate: true
          });
    });

    before(function (done) {
        app.on("serverStarted", function(){
            done();
        });
    });

    it('should return an empty array of images', async () => {
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

    it('should through an error if the image is not provided in the body', async () => {
        try {
            const response = await chai.request(app).post('/images')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .attach('image', '');
            response.should.have.status(400);
            response.body.should.have.ownProperty('error');
        } catch(err) {
            throw new Error(err);
        }
    });

    it('should store the image in the database', async () => {
        console.log(path.join(__dirname, '../../test.jpg'));
        try {
            const response = await chai.request(app).post('/images')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .field('image', 'test.jpg')
                .attach('image', fs.readFileSync(path.join(__dirname, '../../test.jpg')));
            response.should.have.status(201);
            response.body.image.id.should.equal(1);
        } catch(err) {
            throw new Error(err);
        }
    });

    it('should return an object with thumbnails and image', async () => {
        try {
            const response = await chai.request(app).get('/images/1');
            response.should.have.status(200);
            response.body.should.have.ownProperty('image');
            response.body.should.have.ownProperty('thumbnail300');
            response.body.should.have.ownProperty('thumbnail200');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('should return an array of with one image', async () => {
        try {
            const response = await chai.request(app).get('/images');
            response.should.have.status(200);
            response.body.images.length.should.equal(1);
        } catch (err) {
            throw new Error(err);
        }
    });

    it('should return a 404 error when trying a URL that is not available', async () => {
        try {
            const response = await chai.request(app).get('/invalidUrl');
            response.should.have.status(404);
        } catch (err) {
            throw new Error(err);
        }
    });

    it('should return a 405 method not allowed error if trying an invalid http method', async () => {
        try {
            const response = await chai.request(app).put('/images');
            response.should.have.status(405);
        } catch (err) {
            throw new Error(err);
        }
    });
});