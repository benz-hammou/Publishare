const AWS = require("aws-sdk");
const BUCKET_NAME = "publishare-cover";
const s3 = new AWS.S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAZDJKEFKPEIQY4K5C",
    secretAccessKey: "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",
  },
});

/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */

async function upload(imageName, base64Image, type) {
  if (!imageName || !base64Image) {
    return "";
  }
  const params = {
    Bucket: `${BUCKET_NAME}/images`,
    Key: imageName,
    Body: new Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    ),
    ContentType: type,
  };
  let data;

  try {
    data = await promiseUpload(params);
  } catch (err) {
    console.error(err);
    return "";
  }

  return data.Location;
}

async function remove(imageName) {
  var params = { Bucket: `${BUCKET_NAME}/images`, Key: imageName };
  console.log(imageName);
  try {
    await promiseDelete(params);
  } catch (err) {
    console.error(err);
  }
}

/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */

function promiseUpload(params) {
  return new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function promiseDelete(params) {
  return new Promise(function (resolve, reject) {
    s3.deleteObject(params, function (err, data) {
      console.log(params);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { upload, remove };
