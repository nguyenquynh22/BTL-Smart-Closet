const db = require('../common/db');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await db.query('SELECT * FROM outfits');
      res.json({ success: true, data: rows });
    } catch (err) { next(err); }
  },

  getById: async (req, res, next) => {
    try {
      const [rows] = await db.query('SELECT * FROM outfits WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: rows[0] });
    } catch (err) { next(err); }
  },

  create: async (req, res, next) => {
    try {
      const [result] = await db.query('INSERT INTO outfits SET ?', [req.body]);
      res.status(201).json({ success: true, message: 'Created successfully', data: { id: result.insertId, ...req.body } });
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      await db.query('UPDATE outfits SET ? WHERE id = ?', [req.body, req.params.id]);
      res.json({ success: true, message: 'Updated successfully', data: { id: req.params.id, ...req.body } });
    } catch (err) { next(err); }
  },

  delete: async (req, res, next) => {
    try {
      const [result] = await db.query('DELETE FROM outfits WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  }
};
