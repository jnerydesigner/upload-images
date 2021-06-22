import { Request, Response, Express } from "express";
import { FileSchemma } from "../../models/UploadFile";

interface CustonFileProps extends Express.Multer.File {
  key: string;
  originalname: string;
  location: string;
}

class UploadFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      originalname: name,
      size,
      key,
      location: url = "",
    } = request.file as CustonFileProps;


    const upload = await FileSchemma.create({
      name,
      size,
      key,
      url
    })

    return response.status(201)
      .json(upload);
  }
}

export { UploadFilesController }