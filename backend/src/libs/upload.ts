import Express, { Request } from 'express';
import multer, { Options, diskStorage } from "multer";
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
import crypto from "crypto";
import { resolve } from "path";
import { newFileName } from '../helper/newFileName';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "tmp", "uploads"))
    },
    filename: (req, file, cb) => {
      const fileName = newFileName(file.originalname);

      return cb(null, fileName);
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: "upload-file-drcaneca",
    contentType: AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const fileName = newFileName(file.originalname);

      return cb(null, fileName);
    }
  })
}

function MulterConfig() {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "tmp", "uploads"))
    },
    filename: (req, file, cb) => {
      const fileName = newFileName(file.originalname);

      return cb(null, fileName);
    }
  });

  return storage;
};


const multerConfig = {
  dest: resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes['local'],
  limits: 2 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Ivalid file type'));
    }
  }
} as Options;

export { multerConfig, MulterConfig }