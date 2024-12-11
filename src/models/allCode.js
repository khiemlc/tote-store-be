"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // allCode.hasMany(models.Product, {
      //   foreignKey: "categoryId",
      //   as: "categoryData",
      // });
    }
  }
  allCode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "allCode",
      freezeTableName: true,
    }
  );
  return allCode;
};
