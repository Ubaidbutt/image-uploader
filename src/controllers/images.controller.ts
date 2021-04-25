import {
    Request,
    Response
} from 'express';
import {storeThumbnails, findThumbnail} from './thumbnails.controller';
import Image from '../models/image.model';


// Get all images from the database
const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.findAll();
        return res.status(200).send({
            images: images
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
}

// Upload an image to the table, create thumbnails by resizing the image and store it in separate table
const createImage = async (req: any, res: Response) => {
    try {
        if (req.files == null) {
            return res.status(400).send({
                error: 'Please attach the image'
            })
        }
        if (req.files.image == null) {
            return res.status(400).send({
                error: 'The key name should be image'
            });
        }
        const image = req.files.image;
        const imageData: Buffer = image.data;
        const imageDatatoStore = {
            name: image.name,
            data: image.data
        };
        const createdImage: any = await Image.create(imageDatatoStore);
        await storeThumbnails(imageData, createdImage.id);
        return res.status(201).json({
            image: createdImage
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
}

// Get on image based on the ID
const getOneImage = async (req: Request, res: Response) => {
    try {
        // Get the image from Image table
        const image: any = await Image.findByPk(req.params.imageId);
        if (!image) {
            return res.status(404).json({
                error: 'ID does not exist.'
            });
        }
        const imageId = image.id;
        const response: any = await findThumbnail(imageId);
        const base64Image = Buffer.from(image.data).toString('base64');
        return res.status(200).json({
            thumbnail200: response.base64thumbnail200,
            thumbnail300: response.base64thumbnail300,
            image: base64Image
        });
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

export {
    getAllImages,
    getOneImage,
    createImage
};