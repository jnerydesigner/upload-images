import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../libs/upload";
import mongoose from 'mongoose';
import { FileSchemma } from '../models/UploadFile';

import { UploadFilesController } from "../modules/uploadFiles/UploadFilesController";

const routes = Router();


mongoose.connect(String(process.env.MONGO_URL),
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const uploadImages = multer(multerConfig).single("file");


const uploadFilesController = new UploadFilesController;

routes.get('/upload', async (req, res) => {
  const uploads = await FileSchemma.find();

  return res.json(uploads);
});

routes.get('/', uploadFilesController.handle);

routes.post('/upfile',
  uploadImages,
  uploadFilesController.handle
);

routes.delete("/delfile/:id", async (req, res) => {
  console.log('teste');
  const deleteFile = await FileSchemma.findById(req.params.id);

  await deleteFile.remove();

  return res.send();
})

export { routes }