import express, {Router} from 'express';
const fileUpload = require('express-fileupload');

import {
    getAllImages, getOneImage, createImage
} from '../controllers/images.controller';

const imageRouter: Router = express.Router();
imageRouter.use(fileUpload());

imageRouter.route('/')
    .get(getAllImages)
    .post(createImage);

imageRouter.route('/:imageId')
    .get(getOneImage);

export default imageRouter;