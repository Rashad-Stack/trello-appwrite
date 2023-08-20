import { storage } from "@/apwrite";

function getUrl(image: Image) {
  const url = storage.getFilePreview(image.bucketId, image.fileId);
  return url;
}

export default getUrl;
