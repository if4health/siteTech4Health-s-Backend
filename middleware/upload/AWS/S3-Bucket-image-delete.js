require('dotenv').config()
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.ADM_ACCESS_KEY,
  secretAccessKey: process.env.ADM_SECRET_KEY,
});

module.exports = 
  function deleteBucketImage(imageName, folder) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `img/${folder}/${imageName}`,
    };
    
    return s3.deleteObject(params).promise();
  }