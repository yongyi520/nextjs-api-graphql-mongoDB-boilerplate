export const getFileExtension = file => {
  const fileType = file ? file.type : null;
  // console.log('file type', fileType)
  // console.log('typeof fileType', typeof fileType)
  switch (fileType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    default:
      return null;
  }
};