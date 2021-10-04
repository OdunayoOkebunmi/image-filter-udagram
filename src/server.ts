import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from "express";
require('dotenv').config();
import { filterImageFromURL, deleteLocalFiles } from './util/util';
(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8080;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req: Request, res: Response) => {
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
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("Hello World")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${ port }`);
    console.log(`press CTRL+C to stop server`);
  });
})();