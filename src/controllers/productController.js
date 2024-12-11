const productService = require("../services/productService.js");
require("dotenv").config();

let productCreate = async (req, res) => {
  try {
    let infor = await productService.productCreateService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};

let productGetAll = async (req, res) => {
  // let id = req.query.id;
  let products = await productService.productGetAllService();
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    products,
  });
};
let productGetSearch = async (req, res) => {
  let products = await productService.productGetSearchService();
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    products,
  });
};

let productUpdate = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await productService.updateProductService(data);
    return res.status(200).json(message);
  }
};

let productUpdateCount = async (req, res) => {
  let data = req.body;
  if (!data.orderId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await productService.updateProductCountService(data);
    return res.status(200).json(message);
  }
};

let productDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await productService.productDeleteService(req.body.id);
    return res.status(200).json(message);
  }
};

let getProductById = async (req, res) => {
  try {
    let product = await productService.getProductByIdService(req.query.id);
    return res.status(200).json(product);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get product from server ...",
    });
  }
};
let productGetAllType = async (req, res) => {
  try {
    let products = await productService.productGetAllTypeService(
      req.query.type
    );

    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let productNew = async (req, res) => {
  try {
    let products = await productService.productNewService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let productBought = async (req, res) => {
  try {
    let products = await productService.productBoughtService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let productHot = async (req, res) => {
  try {
    let products = await productService.productHotService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
let productPrime = async (req, res) => {
  try {
    let products = await productService.productPrimeService();
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
// let productGetAllBrand = async (req, res) => {
//   try {
//     let products = await productService.productGetAllBrandService(
//       req.query.brand
//     );

//     return res.status(200).json(products);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Can not get order from server ...",
//     });
//   }
// };
let getPercent = async (req, res) => {
  try {
    let products = await productService.getPercentService();
    console.log(products);
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
module.exports = {
  productCreate: productCreate,
  productGetAll: productGetAll,
  productUpdate: productUpdate,
  productDelete: productDelete,
  getProductById: getProductById,
  productGetAllType: productGetAllType,
  productNew: productNew,
  productBought: productBought,
  productHot: productHot,
  productPrime: productPrime,
  // productGetAllBrand: productGetAllBrand,
  productGetSearch: productGetSearch,
  getPercent: getPercent,
  productUpdateCount: productUpdateCount,
};
