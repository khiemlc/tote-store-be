"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.belongsTo(models.Order, { foreignKey: "orderId" });
    }
  }
  Cart.init(
    {
      orderId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      productType: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
      freezeTableName: true,
    }
  );
  return Cart;
};
