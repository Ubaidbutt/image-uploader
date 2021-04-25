import express, {Router} from 'express';
import {Request, Response} from 'express';
const fileUpload = require('express-fileupload');

import {
    getAllImages, getOneImage, createImage
} from '../controllers/images.controller';

const imageRouter: Router = express.Router();
imageRouter.use(fileUpload());

imageRouter.route('/')
    .get(getAllImages)
    .post(createImage)
    .put((req: Request, res: Response) => res.status(405).send('Method not allowed'))
    .delete((req: Request, res: Response) => res.status(405).send('Method not allowed'));

imageRouter.route('/:imageId')
    .get(getOneImage)
    .post((req: Request, res: Response) => res.status(405).send('Method not allowed'))
    .put((req: Request, res: Response) => res.status(405).send('Method not allowed'))
    .delete((req: Request, res: Response) => res.status(405).send('Method not allowed'));

export default imageRouter;