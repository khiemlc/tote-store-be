const statisticsService = require("../services/statisticsService.js");
//cus
let getTopCusMoney = async (req, res) => {
  try {
    let customer = await statisticsService.getTopCusMoneyService();
    return res.status(200).json(customer);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};

//order
let getTopOrderMoney = async (req, res) => {
  try {
    let order = await statisticsService.getTopOrderMoneyService();
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};

//product
let getTopProductSold = async (req, res) => {
  try {
    let products = await statisticsService.getTopProductSoldService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};
let getTopProductStock = async (req, res) => {
  try {
    let products = await statisticsService.getTopProductStockService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};
let getTopProductSoldFew = async (req, res) => {
  try {
    let products = await statisticsService.getTopProductSoldFewService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};
let getOneYear = async (req, res) => {
  try {
    let statisticsOrder = await statisticsService.getOneYearService();
    return res.status(200).json(statisticsOrder);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get from server ...",
    });
  }
};
module.exports = {
  getTopCusMoney: getTopCusMoney,
  getTopOrderMoney: getTopOrderMoney,
  getTopProductSold: getTopProductSold,
  getTopProductStock: getTopProductStock,
  getTopProductSoldFew: getTopProductSoldFew,
  getOneYear: getOneYear,
};
