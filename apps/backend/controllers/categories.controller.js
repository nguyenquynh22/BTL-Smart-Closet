const db = require("../common/db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM categories");
      res.json({ success: true, data: rows });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
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
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Tên danh mục (name) là bắt buộc" });
      }

      const newCategory = { name };
      const [result] = await db.query("INSERT INTO categories SET ?", [
        newCategory,
      ]);

      res.status(201).json({
        success: true,
        message: "Tạo danh mục thành công",
        data: { id: result.insertId, ...newCategory },
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Tên danh mục (name) là bắt buộc" });
      }

      await db.query("UPDATE categories SET name = ? WHERE id = ?", [
        name,
        req.params.id,
      ]);
      res.json({
        success: true,
        message: "Updated successfully",
        data: { id: req.params.id, name },
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const [result] = await db.query("DELETE FROM categories WHERE id = ?", [
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
