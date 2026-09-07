const db = require("../common/db");
const { uploadStream } = require("../services/cloudinary.service");
const { removeBgFree } = require("../services/bgRemoval.service"); // Import hàm tách nền FREE

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM items");
      res.json({ success: true, data: rows });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [
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
      const {
        user_id,
        category_id,
        name,
        item_type,
        price,
        buy_link,
        season,
        note,
        layer_type,
      } = req.body;

      if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng tải lên file ảnh hợp lệ (field name: "image")',
        });
      }

      if (!category_id) {
        return res.status(400).json({
          success: false,
          message: "category_id là bắt buộc",
        });
      }

      const originalBuffer = req.file.buffer;
      console.log("[1/3] Đang xoá nền và chuyển ảnh sang PNG bằng AI...");
      // Tách nền local bằng AI (Nhận JPG/JPEG/WEBP -> Ra Buffer PNG)
      const cleanPngBuffer = await removeBgFree(originalBuffer);

      console.log("[2/3] Đang upload ảnh lên Cloudinary...");
      const cloudinaryResult = await uploadStream(
        cleanPngBuffer,
        "smart-closet/items",
        { format: "png" }
      );
      const imageUrl = cloudinaryResult?.secure_url || cloudinaryResult?.url;

      if (!imageUrl) {
        return res.status(500).json({
          success: false,
          message: "Upload ảnh lên Cloudinary không thành công",
        });
      }

      console.log("[3/3] Đang ghi dữ liệu vào CSDL...");
      const newItemData = {
        user_id: Number(user_id || 1),
        category_id: Number(category_id),
        name: name || "Món đồ mới",
        image_url: imageUrl,
        item_type: item_type || "IN_WARDROBE",
        price: Number(price || 0),
        buy_link: buy_link || null,
        season: season || "ALL_SEASONS",
        note: note || null,
        layer_type: layer_type || "MIDDLE",
      };

      const [result] = await db.query("INSERT INTO items SET ?", [newItemData]);

      res.status(201).json({
        success: true,
        message: "Thêm món đồ thành công",
        data: { id: result.insertId, ...newItemData },
      });
    } catch (err) {
      console.error("Create item error:", err);
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      await db.query("UPDATE items SET ? WHERE id = ?", [
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
      const [result] = await db.query("DELETE FROM items WHERE id = ?", [
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