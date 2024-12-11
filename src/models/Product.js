"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      descriptionHTML: DataTypes.TEXT("long"),
      type: DataTypes.STRING,
      content: DataTypes.TEXT("long"),
      contentHTML: DataTypes.TEXT("long"),
      avatar: DataTypes.BLOB("long"),
      initPrice: DataTypes.STRING,
      truePrice: DataTypes.STRING,
      percent: DataTypes.STRING,
      countInStock: DataTypes.INTEGER,
      // brand: DataTypes.STRING,
      countSold: DataTypes.INTEGER,
      isHot: DataTypes.INTEGER,
      isTopSearch: DataTypes.INTEGER,
      isNew: DataTypes.INTEGER,
      isBoughtMany: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      freezeTableName: true,
    }
  );
  return Product;
};
