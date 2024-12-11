"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
      },
      isBill: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.STRING,
      },
      shipAddress: {
        type: Sequelize.STRING,
      },
      cusName: {
        type: Sequelize.STRING,
      },
      cusPhoneNumber: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },

      isPaid: {
        type: Sequelize.INTEGER,
      },
      paidAt: {
        type: Sequelize.STRING,
      },
      isDelivered: {
        type: Sequelize.INTEGER,
      },
      deliveredAt: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Order");
  },
};
