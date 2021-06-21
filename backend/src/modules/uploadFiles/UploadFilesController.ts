import { Request, Response } from "express";
import { FileSchemma } from "../../models/UploadFile";


class UploadFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      originalname: name,
      size,
      filename: key,
      location: url = "",
    } = request.file;


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