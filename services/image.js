// services/image.js
const path = require('path');
const fs = require('fs');

module.exports = {
  myImgUploadFunction: async (req, folder) => {
    if (!req.files || !req.files.mypic) {
      throw new Error('No file uploaded');
    }

    const file = req.files.mypic;
    const uploadPath = path.join(__dirname, '/../public/images/', folder, file.name);

    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype.toLowerCase());
    const extname = filetypes.test(path.extname(file.name).toLowerCase());

    if (!mimetype || !extname) {
      throw new Error(
        'File upload only supports the following filetypes: ' + filetypes
      );
    }

    const dir = path.dirname(uploadPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(uploadPath, file.data);

    console.log('Image uploaded successfully:', uploadPath);

    return file.name;
  },

  deleteBucketImage: async (imageName, folder) => {
    const filePath = path.join(__dirname, '/../public/images/', folder, imageName);

    await fs.promises.unlink(filePath);
    console.log('Image deleted successfully:', filePath);

    return { message: 'Image deleted locally', filePath };
  }
};
