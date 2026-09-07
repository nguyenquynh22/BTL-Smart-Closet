const db = require("../common/db");
const bcrypt = require("bcrypt");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await db.query(
        "SELECT id, email, full_name, gender, role, status, created_at FROM users",
      );
      res.json({ success: true, data: rows });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await db.query(
        "SELECT id, email, full_name, gender, role, status, created_at FROM users WHERE id = ?",
        [req.params.id],
      );
      if (rows.length === 0)
        return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, data: rows[0] });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { email, password, full_name, gender, role, status } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email và password là bắt buộc" });
      }

      // 1. Mã hóa password
      const password_hash = await bcrypt.hash(password, 10);

      // 2. Gom dữ liệu theo chuẩn schema database (password_hash)
      const newUser = {
        email,
        password_hash,
        full_name: full_name || null,
        gender: gender || "UNISEX",
        role: role || "USER",
        status: status || "ACTIVE",
      };

      // 3. Thực thi query
      const [result] = await db.query("INSERT INTO users SET ?", [newUser]);

      // Bỏ password_hash khi trả về response
      delete newUser.password_hash;

      res.status(201).json({
        success: true,
        message: "Tạo người dùng thành công",
        data: { id: result.insertId, ...newUser },
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { email, password, full_name, gender, role, status } = req.body;
      const updateData = {};

      // Chỉ lấy các trường hợp lệ được phép update
      if (email) updateData.email = email;
      if (full_name !== undefined) updateData.full_name = full_name;
      if (gender) updateData.gender = gender;
      if (role) updateData.role = role;
      if (status) updateData.status = status;

      // Nếu đổi mật khẩu thì mã hóa vào password_hash
      if (password) {
        updateData.password_hash = await bcrypt.hash(password, 10);
      }

      if (Object.keys(updateData).length === 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Không có dữ liệu nào được thay đổi",
          });
      }

      await db.query("UPDATE users SET ? WHERE id = ?", [
        updateData,
        req.params.id,
      ]);

      delete updateData.password_hash;

      res.json({
        success: true,
        message: "Updated successfully",
        data: { id: req.params.id, ...updateData },
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [
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
