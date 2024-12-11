const { or } = require("sequelize");
const db = require("../models/index.js");
const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const operatorsAliases = {
  $eq: op.eq,
  $or: op.or,
};
const quickSort = (array, prop) => {
  if (array.length <= 1) return array;
  const pivot = array[0][prop];
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i][prop] > pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [...quickSort(left, prop), array[0], ...quickSort(right, prop)];
};

const getLimit = (obj, limit) => {
  if (!limit) limit = 5;
  let obj_limit = [];

  for (let i = 0; i < limit; i++) {
    obj_limit.push(obj[i]);
  }
  return obj_limit;
};
// start
//customer
let getTopCusMoneyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await db.User.findAll({
        where: { roleId: "1" },
        attributes: {
          exclude: ["password"],
        },
      });
      let customer_sort = {};
      if (!customer) {
        customer_sort = {};
      } else {
        let check = [];
        customer.map((item) => {
          item.totalMoney = +item.totalMoney;
          check.push(item);
        });
        customer_sort = getLimit(quickSort(check, "totalMoney"));
      }

      resolve({
        errCode: 0,
        customer: customer_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//order

let getTopOrderMoneyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findAll({
        where: { status: "Đã hoàn thành" },
        attributes: [
          "id",
          "totalQuantity",
          "totalPrice",
          "shipAddress",
          "cusName",
          "cusPhoneNumber",
          "updatedAt",
        ],
        include: [
          {
            model: db.Cart,
            order: [["updatedAt", "DESC"]],
            attributes: ["productName", "productType", "quantity"],
          },
        ],
        raw: false,
        nest: true,
      });
      let order_sort = {};
      if (!order) {
        order_sort = {};
      } else {
        let check = [];
        order.map((item) => {
          item.totalPrice = +item.totalPrice;
          check.push(item);
        });
        order_sort = getLimit(quickSort(check, "totalPrice"), 7);
      }

      resolve({
        errCode: 0,
        order: order_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//product
let getTopProductSoldService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        order: [["countSold", "DESC"]],
        attributes: [
          "name",
          "type",
          // "brand",
          "initPrice",
          "truePrice",
          "percent",
          "countInStock",
          "countSold",
        ],
      });
      let product_sort = {};
      if (!products) {
        product_sort = {};
      } else {
        product_sort = getLimit(products, 7);
      }
      resolve({
        errCode: 0,
        products: product_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTopProductStockService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        order: [["countInStock", "DESC"]],
        attributes: [
          "name",
          "type",
          "initPrice",
          "truePrice",
          "percent",
          "countInStock",
          "countSold",
        ],
      });
      let product_sort = {};
      if (!products) {
        product_sort = {};
      } else {
        product_sort = getLimit(products, 7);
      }
      resolve({
        errCode: 0,
        products: product_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTopProductSoldFewService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        order: [["countSold", "ASC"]],
        attributes: [
          "name",
          "type",
          // "brand",
          "initPrice",
          "truePrice",
          "percent",
          "countInStock",
          "countSold",
        ],
      });
      let product_sort = {};
      if (!products) {
        product_sort = {};
      } else {
        product_sort = getLimit(products, 7);
      }
      resolve({
        errCode: 0,
        products: product_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderByMonth = (order) => {
  let statisticsOrder = [];
  for (let i = 1; i <= 12; i++) {
    let orderArr = [];
    order.map((item) => {
      if (
        item.updatedAt.toISOString().slice(5, 7) ===
        (i < 10 ? "0" + i.toString() : i.toString())
      ) {
        orderArr.push(item);
      }
    });
    let orderAfterCaCu = caculatorOrder(orderArr);
    statisticsOrder.push({
      month: i < 10 ? "0" + i.toString() : i.toString(),
      totalMoney: orderAfterCaCu.totalMoney,
      totalOrder: orderAfterCaCu.totalOrder,
    });
  }
  return statisticsOrder;
};
let caculatorOrder = (orderArr) => {
  let totalMoney = 0,
    totalOrder = orderArr.length;
  orderArr.map((item) => {
    totalMoney = totalMoney + +item.totalPrice;
  });
  return { totalMoney, totalOrder };
};
let getOneYearService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findAll({
        where: { status: "Đã hoàn thành" },
        attributes: [
          "id",
          "totalQuantity",
          "totalPrice",
          "shipAddress",
          "cusName",
          "cusPhoneNumber",
          "updatedAt",
        ],
      });
      let statisticsOrder = getOrderByMonth(order);
      resolve({
        errCode: 0,
        statisticsOrder: statisticsOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopCusMoneyService: getTopCusMoneyService,
  getTopOrderMoneyService: getTopOrderMoneyService,
  getTopProductSoldService: getTopProductSoldService,
  getTopProductStockService: getTopProductStockService,
  getTopProductSoldFewService: getTopProductSoldFewService,
  getOneYearService: getOneYearService,
};
