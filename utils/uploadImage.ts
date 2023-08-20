import { ID, storage } from "@/apwrite";

function uploadImage(image: File) {
  if (!image) return;

  const imageUploaded = storage.createFile(
    "6472e248147abf1c9cbd",
    ID.unique(),
    image
  );
  return imageUploaded;
}

export default uploadImage;
