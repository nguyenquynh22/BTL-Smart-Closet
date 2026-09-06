const db = require("../common/db");
const { uploadStream } = require("../services/cloudinary.service");
const { removeBgFree } = require("../services/bgRemoval.service"); // Import thêm hàm tách nền FREE

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM mannequins");
      res.json({ success: true, data: rows });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM mannequins WHERE id = ?", [
        req.params.id,
      ]);
      if (rows.length === 0)
        return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, data: rows[0] });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, gender } = req.body;

      if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng tải lên file ảnh ma-nơ-canh (field name: "image")',
        });
      }

      const originalBuffer = req.file.buffer;
      console.log("[1/3] Đang tách nền ma-nơ-canh và chuyển thành PNG...");
      // Tách nền local bằng AI (Nhận JPG/JPEG/WEBP -> Ra Buffer PNG)
      const cleanPngBuffer = await removeBgFree(originalBuffer);

      console.log("[2/3] Đang upload lên Cloudinary...");
      const cloudinaryResult = await uploadStream(
        cleanPngBuffer,
        "smart-closet/mannequins",
        { format: "png" }
      );
      const imageUrl = cloudinaryResult?.secure_url || cloudinaryResult?.url;

      if (!imageUrl) {
        return res.status(500).json({
          success: false,
          message: "Upload ảnh lên Cloudinary không thành công",
        });
      }

      console.log("[3/3] Đang ghi vào CSDL...");
      const newMannequin = {
        name: name || "Ma-nơ-canh tiêu chuẩn",
        gender: gender || "UNISEX",
        image_url: imageUrl,
      };

      const [result] = await db.query("INSERT INTO mannequins SET ?", [
        newMannequin,
      ]);

      res.status(201).json({
        success: true,
        message: "Thêm ma-nơ-canh thành công",
        data: { id: result.insertId, ...newMannequin },
      });
    } catch (err) {
      console.error("Create mannequin error:", err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      await db.query("UPDATE mannequins SET ? WHERE id = ?", [
        req.body,
        req.params.id,
      ]);
      res.json({
        success: true,
        message: "Updated successfully",
        data: { id: req.params.id, ...req.body },
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const [result] = await db.query("DELETE FROM mannequins WHERE id = ?", [
        req.params.id,
      ]);
      if (result.affectedRows === 0)
        return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};