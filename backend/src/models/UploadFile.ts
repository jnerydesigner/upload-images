import mongoose, { SchemaType } from 'mongoose';

interface PreProps {
  url: string;
  key: string;
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
})

const FileSchemma = mongoose.model('UploadFile', UploadFileSchemma);


export { FileSchemma };