const adminService = require("../services/adminService.js");
//manage user
let customerGetAll = async (req, res) => {
  try {
    let customer = await adminService.customerGetAllService();
    return res.status(200).json(customer);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let adminGetAll = async (req, res) => {
  try {
    let admin = await adminService.adminGetAllService();
    return res.status(200).json(admin);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let updateCustomerExtra = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await adminService.updateCustomerExtraService(data);
    return res.status(200).json(message);
  }
};
// manage order
let getOrderChecking = async (req, res) => {
  try {
    let order = await adminService.getOrderCheckingService();
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};

let getOrderStatus = async (req, res) => {
  try {
    let order = await adminService.getOrderStatusService(req.query.id);
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};

let orderDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await adminService.orderDeleteService(req.body.id);
    return res.status(200).json(message);
  }
};

let orderUpdate = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await adminService.orderUpdateService(data);
    return res.status(200).json(message);
  }
};
let orderUpdateStatus = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await adminService.orderUpdateStatusService(data);
    return res.status(200).json(message);
  }
};
module.exports = {
  getOrderChecking: getOrderChecking,
  orderDelete: orderDelete,
  orderUpdate: orderUpdate,
  orderUpdateStatus: orderUpdateStatus,
  getOrderStatus: getOrderStatus,
  customerGetAll: customerGetAll,
  adminGetAll: adminGetAll,
  updateCustomerExtra: updateCustomerExtra,
};
