export const imageFileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    return callback(new Error('Only zip files are allowed!'), false);
  }
  callback(null, true);
};
