"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      descriptionHTML: {
        type: Sequelize.TEXT("long"),
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
      },
      type: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT("long"),
      },
      avatar: {
        type: Sequelize.BLOB("long"),
      },
      initPrice: {
        type: Sequelize.STRING,
      },
      truePrice: {
        type: Sequelize.STRING,
      },
      isHot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      percent: {
        type: Sequelize.STRING,
      },
      countInStock: {
        type: Sequelize.INTEGER,
      },
      // brand: {
      //   type: Sequelize.STRING,
      // },
      countSold: {
        type: Sequelize.INTEGER,
      },
      isTopSearch: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isNew: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isBoughtMany: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Product");
  },
};
