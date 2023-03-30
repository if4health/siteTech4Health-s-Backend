const AWS = require('aws-sdk');
const path = require('path');
const s3 = new AWS.S3({
  accessKeyId: process.env.ADM_ACCESS_KEY,
  secretAccessKey: process.env.ADM_SECRET_KEY,
});

module.exports = {
  myImgUploadFunction: (req, res, folder) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.mypic;
    console.log(__dirname + '/../public/images/' + file.name);

    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.name).toLowerCase());

    if (!mimetype || !extname) {
      return res
        .status(500)
        .send('Error: File upload only supports the following filetypes - ' + filetypes);
    }

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `img/${folder}/${file.name}`,
      Body: file.data,
    };

    console.log(params)

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
