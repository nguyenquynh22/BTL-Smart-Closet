const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "2CEQavGtmUjQrne.root",
  password: "izGepAULegvdpTt1",
  database: "smart_closet",
  port: 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  }
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('![LỖI] Kết nối CSDL thất bại:', err.message);
  } else {
    console.log('[OK] Đã kết nối Cơ sở dữ liệu thành công!');
    connection.release();
  }
});

module.exports = pool.promise();
