"use strict";
const { Model } = require("sequelize");
const Cart = require("./Cart");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: "userId" });
      User.hasMany(models.Order, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      roleId: DataTypes.STRING,
      annotate: DataTypes.STRING,
      totalMoney: DataTypes.STRING,
      totalOrder: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
