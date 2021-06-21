import crypto from "crypto";

export function newFileName(original: string) {
  const fileHash = crypto.randomBytes(16).toString("hex");
  const fileNameArray = original.split('.');
  const fileNameLenght = fileNameArray[0].length;
  const fileNameExtension = original.slice(fileNameLenght);
  const fileName = `${fileHash}${fileNameExtension}`;
  return fileName;
}