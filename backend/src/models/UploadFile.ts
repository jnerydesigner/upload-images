import mongoose, { SchemaType } from 'mongoose';
import aws from 'aws-sdk';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const s3 = new aws.S3();

interface PreProps {
  url: string;
  key: string;
  Bucket: string;
}


const UploadFileSchemma = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

UploadFileSchemma.pre<PreProps>('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

UploadFileSchemma.pre<PreProps>('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    s3.deleteObject({
      Bucket: String(process.env.BUCKET_NAME),
      Key: this.key,
    })
      .promise()
      .then(response => console.log(response.status))
      .catch(response => console.log(response.status))
  } else {
    promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
})

const FileSchemma = mongoose.model('UploadFile', UploadFileSchemma);


export { FileSchemma };