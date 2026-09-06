const { removeBackground } = require("@imgly/background-removal-node");
const sharp = require("sharp");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const imglyDistPath = path.dirname(
  require.resolve("@imgly/background-removal-node"),
);
const imglyPublicPath = `${pathToFileURL(`${imglyDistPath}${path.sep}`).href}`;

async function removeBgFree(fileBuffer) {
  if (!Buffer.isBuffer(fileBuffer) || fileBuffer.length === 0) {
    throw new Error("File ảnh không hợp lệ hoặc rỗng");
  }

  try {
    const normalizedPngBuffer = await sharp(fileBuffer).png().toBuffer();
    const blob = new Blob([normalizedPngBuffer], { type: "image/png" });
    const resultBlob = await removeBackground(blob, {
      publicPath: imglyPublicPath,
      model: "medium",
      output: { format: "image/png" },
    });

    if (!resultBlob) {
      throw new Error("Dịch vụ xoá nền không trả về ảnh");
    }

    const arrayBuffer = await resultBlob.arrayBuffer();
    const pngBuffer = Buffer.from(arrayBuffer);

    if (
      pngBuffer.length < 8 ||
      !pngBuffer
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    ) {
      throw new Error("Kết quả xoá nền không phải PNG hợp lệ");
    }

    return pngBuffer;
  } catch (error) {
    console.error("Xoá nền AI thất bại:", error.message || error);
    throw new Error("Không thể xoá nền và chuyển ảnh sang PNG", {
      cause: error,
    });
  }
}

module.exports = { removeBgFree };
