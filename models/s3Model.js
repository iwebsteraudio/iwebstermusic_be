const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const S3_BUCKET = process.env.S3_BUCKET_NAME;

module.exports = {
    getFileUrl: (fileName) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60 * 60,
        }
        return s3.getSignedUrlPromise('getObject', params)
    }
}