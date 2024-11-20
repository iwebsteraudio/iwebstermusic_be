const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.listAllFiles = () => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  return s3
    .listObjectsV2(params)
    .promise()
    .then((data) => {
      return data.Contents.map((item) => ({
        fileName: item.Key,
        url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
      }));
    });
};
