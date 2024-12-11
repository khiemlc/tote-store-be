"use strict";
require("dotenv").config(); // Import thư viện dotenv

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

// Cấu hình Sequelize tùy chỉnh
const customizeConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || "postgres",
  logging: false, // Tắt logging để dễ đọc log (bật nếu cần debug)
  dialectOptions:
    process.env.DB_SSL === "true"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Cho phép kết nối SSL không xác thực
          },
        }
      : {},
  query: {
    raw: true,
  },
};

let sequelize;

// Kiểm tra biến môi trường DB_URL hoặc thông tin kết nối thủ công
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, customizeConfig);
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME || "postgres",
    process.env.DB_USERNAME || "postgres",
    process.env.DB_PASSWORD || "123456",
    customizeConfig
  );
}

// Tự động nạp tất cả các model trong thư mục
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Xử lý các mối quan hệ giữa các model nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Gán đối tượng Sequelize và kết nối tới db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
