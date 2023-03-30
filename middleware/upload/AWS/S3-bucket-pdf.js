const AWS = require('aws-sdk');
const path = require('path');
const s3 = new AWS.S3({
  accessKeyId: process.env.ADM_ACCESS_KEY,
  secretAccessKey: process.env.ADM_SECRET_KEY,
});

module.exports = {
  myPdfUploadFunction: (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.mywork;
    console.log(__dirname + '/../public/files/' + file.name);

    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.name).toLowerCase());

    if (!mimetype || !extname) {
      return res
        .status(500)
        .send('Error: File upload only supports PDF files');
    }

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: 'pdf/' + file.name,
      Body: file.data,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      console.log('File uploaded successfully.');
      console.log('File location:', data.Location);

      // res.json({ fileName: file.name, filePath: data.Location });
    });
  },
};
