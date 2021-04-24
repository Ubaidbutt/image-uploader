import {Request, Response} from 'express';
import sharp from 'sharp';
import Image from '../models/image.model';
import Thumbnail from '../models/thumbnails.model';

// Helper function to resize images using sharp library
const resizeImage = async (image: Buffer, height: number, width: number): Promise<Buffer> => {
    const resizedImage = await sharp(image).resize(height, width).toBuffer()
    return resizedImage;
}

// Get all images from the database
const getAllImages = async (req: Request, res: Response) => {
    const images = await Image.findAll();
    return res.status(200).json({images: images});
}

// Upload an image to the table, create thumbnails by resizing the image and store it in separate table
const createImage = async (req: any, res: Response) => {
    const image = req.files.image;
    const imageData = image.data;
    const imageDatatoStore = {
        name: image.name,
        data: image.data
    };
    const createdImage: any = await Image.create(imageDatatoStore);
    const thumbnail_300 = await resizeImage(imageData, 300, 300);
    const thumbnail_200 = await resizeImage(imageData, 200, 200);
    const thumbnailDatatoStore = {
        thumbnail300: thumbnail_300,
        thumbnail200: thumbnail_200,
        imageId: createdImage.id
    }
    const createdThumbnail = await Thumbnail.create(thumbnailDatatoStore);
    return res.status(201).json({image: createdImage});
}

// Get on image based on the ID
const getOneImage = async (req: Request, res: Response) => {
    const image: any = await Image.findByPk(req.params.imageId);
    if (!image) {
        return res.status(404).json({error: 'ID does not exist.'});
    }
    const imageId = image.id;
    const base64Image = Buffer.from(image.data).toString('base64');
    const thumbnail: any = await Thumbnail.findOne({where: {imageId}});
    const base64thumbnail300 = Buffer.from(thumbnail.thumbnail300).toString('base64');
    const base64thumbnail200 = Buffer.from(thumbnail.thumbnail200).toString('base64');
    const responseObject = {
        thumbnails: {
            thumbnail200: base64thumbnail200,
            thumbnail300: base64thumbnail300
        },
        image: base64Image
    }
    return res.status(200).json({data: responseObject});
}

export {getAllImages, getOneImage, createImage};