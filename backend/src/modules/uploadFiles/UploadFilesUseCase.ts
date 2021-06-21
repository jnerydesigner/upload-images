import { FileSchemma } from "../../models/UploadFile";

interface FileDTO {
  originalname: string;
  size: number;
  filename: string;
  url: string;
}

class UploadFilesUseCase {
  async execute({ originalname: name, size, filename: key, url }: FileDTO) {
    const upload = await FileSchemma.create({
      name,
      size,
      key,
      url: ''
    });

    return upload;
  }
}

export { UploadFilesUseCase }