import { Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../../../util/util';

export const filterImage = async (req: Request, res: Response) => {
  try {
    let { image_url } = req.query;
    if (!image_url) {
      return res.status(400)
        .send('Image url is required')
    }
    const filteredImage = await filterImageFromURL(image_url.toString())
    res.status(200)
      .sendFile(filteredImage)
    res.on('finish', () => deleteLocalFiles([filteredImage]));
  } catch (error) {
    return res.status(500)
      .send('Unable to download image')
  }

}