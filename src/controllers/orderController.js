const orderService = require("../services/orderService.js");
//carrt
let cartAdd = async (req, res) => {
  try {
    let infor = await orderService.cartAddService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};

let cartDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await orderService.cartDeleteService(req.body.id);
    return res.status(200).json(message);
  }
};
let cartGetAll = async (req, res) => {
  try {
    let cart = await orderService.cartGetAllService(req.query.userId);

    return res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get cart from server ...",
    });
  }
};
let cartUpdate = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await orderService.cartUpdateService(data);
    return res.status(200).json(message);
  }
};

//order
let orderCreate = async (req, res) => {
  try {
    let infor = await orderService.orderCreateService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};
let cartUpdateAfterOrder = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await orderService.cartUpdateAfterOrderService(data);
    return res.status(200).json(message);
  }
};
let getOrderById = async (req, res) => {
  try {
    let order = await orderService.getOrderByIdService(req.query.id);
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let getCartByOrderId = async (req, res) => {
  try {
    let cart = await orderService.getCartByOrderIdService(req.query.id);
    return res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let orderCancel = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await orderService.orderCancelService(data);
    return res.status(200).json(message);
  }
};
let getOrderByUserId = async (req, res) => {
  try {
    let order = await orderService.getOrderByUserIdService(req.query.id);
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};

module.exports = {
  cartAdd: cartAdd,
  cartDelete: cartDelete,
  cartGetAll: cartGetAll,
  cartUpdate: cartUpdate,
  orderCreate: orderCreate,
  cartUpdateAfterOrder: cartUpdateAfterOrder,
  getOrderById: getOrderById,
  getCartByOrderId: getCartByOrderId,
  orderCancel: orderCancel,
  getOrderByUserId: getOrderByUserId,
};
