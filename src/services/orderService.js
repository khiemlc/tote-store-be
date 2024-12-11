const bcrypt = require("bcryptjs");
const db = require("../models/index.js");
//cart
let checkExistCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Cart.findOne({
        where: { userId: userId, productId: productId },
      });
      if (user && user.orderId === null) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let cartAddService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: data.productId },
        attributes: ["name", "type", "truePrice"],
      });
      let truePrice = product === null ? 0 : product.truePrice;
      let check = await checkExistCart(data.userId, data.productId);
      if (check) {
        let cart = await db.Cart.findOne({
          where: {
            userId: data.userId,
            productId: data.productId,
          },
          raw: false,
        });

        cart.quantity += 1;
        cart.totalPrice = cart.quantity * +truePrice;
        await cart.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        await db.Cart.create({
          orderId: null,
          userId: data.userId,
          productId: data.productId,
          productName: product?.name,
          productType: product?.type,
          quantity: 1,
          totalPrice: truePrice,
          note: data.note,
        });

        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let cartDeleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { id: id },
      });
      if (cart) {
        db.Cart.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No cart found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let cartGetAllService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 0,
          cart: {},
        });
      } else {
        let cart = await db.Cart.findAll({
          where: { userId: userId, orderId: null },
          order: [["createdAt", "DESC"]],
        });
        let product = {};
        if (!cart) {
          cart = {};
          resolve({
            errCode: 0,
            cart: cart,
          });
        } else {
          for (let i = 0; i < cart.length; i++) {
            product = await db.Product.findOne({
              where: { id: cart[i].productId },
              attributes: ["name", "type", "truePrice", "avatar"],
            });

            cart[i].productName = product.name;
            cart[i].productType = product.type;
            cart[i].productTruePrice = product.truePrice;
            cart[i].productAvatar = product.avatar;
          }
          resolve({
            errCode: 0,
            cart: cart,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let cartUpdateService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (cart) {
        let product = await db.Product.findOne({
          where: { id: data.productId },
          raw: false,
          attributes: ["truePrice"],
        });
        cart.quantity = data.quantity;
        cart.totalPrice = +cart.quantity * +product.truePrice;
        await cart.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No cart found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//order
let orderCreateService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.create({
        userId: data.userId,
        totalQuantity: data.totalQuantity,
        totalPrice: data.totalPrice,
        shipAddress: data.shipAddress,
        cusName: data.cusName,
        cusPhoneNumber: data.cusPhoneNumber,
        status: "Chờ xác nhận",
        paymentMethod: data.paymentMethod,
        isBill: data.isBill,
        note: data.note,
        isPay: 0,
      });

      resolve({
        errCode: 0,
        errMessage: "Success",
        order: order,
      });

      resolve({
        errCode: 0,
        errMessage: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let cartUpdateAfterOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (cart) {
        cart.orderId = data.orderId;
        await cart.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No cart found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getOrderByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let order = await db.Order.findOne({
          where: { id: id },
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
let getCartByOrderIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let cart = await db.Cart.findAll({
          where: { orderId: id },
          attributes: ["productName", "productType", "quantity", "totalPrice"],
        });
        if (!cart) cart = {};
        resolve({
          errCode: 0,
          cart: cart,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let orderCancelService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (order) {
        order.status = "Yêu cầu hủy";
        order.note = data.note;
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
let getOrderByUserIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let order = await db.Order.findAll({
          where: { userId: id },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.Cart,
              order: [["updatedAt", "DESC"]],
              attributes: [
                "productName",
                "productType",
                "quantity",
                "totalPrice",
              ],
            },
          ],
          raw: false,
          nest: true,
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
module.exports = {
  cartAddService: cartAddService,
  cartDeleteService: cartDeleteService,
  cartGetAllService: cartGetAllService,
  cartUpdateService: cartUpdateService,
  orderCreateService: orderCreateService,
  cartUpdateAfterOrderService: cartUpdateAfterOrderService,
  getOrderByIdService: getOrderByIdService,
  getCartByOrderIdService: getCartByOrderIdService,
  orderCancelService: orderCancelService,
  getOrderByUserIdService: getOrderByUserIdService,
};
