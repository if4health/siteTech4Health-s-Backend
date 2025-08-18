const path = require('path');
const fs = require('fs');

module.exports = {
  myPdfUploadFunction: async (req) => {
    if (!req.files || !req.files.mywork) {
      throw new Error('No file uploaded');
    }

    const file = req.files.mywork;
    const uploadPath = path.join(__dirname, '/../public/files/', file.name);

    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.name).toLowerCase());

    if (!mimetype || !extname) {
      throw new Error('File upload only supports PDF files');
    }

    const dir = path.dirname(uploadPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(uploadPath, file.data);

    console.log('File uploaded successfully:', uploadPath);

    return file.name;
  },

  deleteBucketFile: async (fileName) => {
    const filePath = path.join(__dirname, '/../public/files/', fileName);

    await fs.promises.unlink(filePath);
    console.log('File deleted locally:', filePath);

    return { message: 'File deleted locally', filePath };
  }
};
