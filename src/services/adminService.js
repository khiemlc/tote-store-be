"use strict";
const db = require("../models/index.js");
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

//manage user
let customerGetAllService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await db.User.findAll({
        where: { roleId: "1" },
        attributes: {
          exclude: ["password"],
        },
      });
      let check = [];
      customer.map((item) => {
        item.totalMoney = +item.totalMoney;
        check.push(item);
      });
      if (!customer) customer = {};
      let customer_sort = quickSort(check, "totalMoney");
      resolve({
        errCode: 0,
        customer: customer_sort,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let adminGetAllService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let admin = await db.User.findAll({
        where: { roleId: "0" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
      });
      if (!admin) admin = {};
      resolve({
        errCode: 0,
        admin: admin,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateCustomerExtraService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          attributes: {
            exclude: ["password"],
          },
          raw: false,
        });

        if (user) {
          user.totalMoney = +user.totalMoney + +data.totalMoney;
          user.totalOrder = +user.totalOrder + 1;
          await user.save();
          resolve({
            errCode: 0,
            errMessage: "Success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "No user found!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
// manage order
let getOrderCheckingService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findAll({
        where: { status: "Chờ xác nhận" },
        order: [["createdAt", "DESC"]],
      });
      if (!order) order = {};
      resolve({
        errCode: 0,
        order: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderStatusService = (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!status) {
        resolve({
          errCode: -1,
          errMessage: "Can not get order from server ...",
        });
      } else {
        let order = await db.Order.findAll({
          where: { status: status },
          order: [["createdAt", "DESC"]],
        });

        if (!order) order = {};
        resolve({
          errCode: 0,
          order: order,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let orderDeleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: id },
      });
      if (order) {
        db.Order.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No order found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let orderUpdateService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (order) {
        order.cusName = data.cusName;
        order.cusPhoneNumber = data.cusPhoneNumber;
        order.paymentMethod = data.paymentMethod;
        order.isBill = data.isBill;
        order.shipAddress = data.shipAddress;
        await order.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No order found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let orderUpdateStatusService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (order) {
        order.status = data.status;
        await order.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No order found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getOrderCheckingService: getOrderCheckingService,
  orderDeleteService: orderDeleteService,
  orderUpdateService: orderUpdateService,
  orderUpdateStatusService: orderUpdateStatusService,
  getOrderStatusService: getOrderStatusService,
  customerGetAllService: customerGetAllService,
  adminGetAllService: adminGetAllService,
  updateCustomerExtraService: updateCustomerExtraService,
};
