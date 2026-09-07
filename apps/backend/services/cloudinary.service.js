const cloudinary = require("../common/cloudinary");
const streamifier = require("streamifier");

const uploadStream = (
  buffer,
  folder = "smart-closet/items",
  options = { format: "png" }
) => {
  return new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      reject(new Error("Buffer ảnh không hợp lệ để upload lên Cloudinary"));
      return;
    }

    const uploadOptions = {
      folder,
      resource_type: "image",
      format: options.format || "png",
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { uploadStream };