import Thumbnail from '../models/thumbnails.model';
import sharp from 'sharp';

const createThumbnails = async (image: Buffer, height: number, width: number): Promise < Buffer > => {
    try {
        const resizedImage = await sharp(image).resize(height, width).toBuffer()
        return resizedImage;
    } catch (err) {
        throw new Error(err);
    }
}

const storeThumbnails = async (image: Buffer, imageId: number) => {
    try {
        const thumbnail300 = await createThumbnails(image, 300, 300);
        const thumbnail200 = await createThumbnails(image, 200, 200);
        const thumbnailDatatoStore = {
            thumbnail300,
            thumbnail200,
            imageId
        }
        const createdThumbnail = await Thumbnail.create(thumbnailDatatoStore);
        return createdThumbnail;
    } catch (err) {
        throw new Error(err);
    }
}

const findThumbnail = async (imageId: number) => {
    try {
        // Find the thumbnail where the imageId matches
        const thumbnail: any = await Thumbnail.findOne({
            where: {
                imageId
            }
        });
        const base64thumbnail300 = Buffer.from(thumbnail.thumbnail300).toString('base64');
        const base64thumbnail200 = Buffer.from(thumbnail.thumbnail200).toString('base64');
        return {base64thumbnail200, base64thumbnail300};
    } catch (err) {
        throw new Error(err);
    }
}

export {
    findThumbnail,
    storeThumbnails
};