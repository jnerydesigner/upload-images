import mongoose from 'mongoose';


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

UploadFileSchemma.pre('save', function () {

})

const FileSchemma = mongoose.model('UploadFile', UploadFileSchemma);


export { FileSchemma };