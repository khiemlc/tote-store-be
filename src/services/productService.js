const bcrypt = require("bcryptjs");
const db = require("../models/index.js");
const { query } = require("express");
const { where } = require("sequelize");

require("dotenv").config();
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
let checkExistProduct = (productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { name: productName },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let productCreateService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkExistProduct(data.name);
      if (check) {
        resolve({
          errCode: 1,
          errMessage: "Product exist!",
        });
      } else {
        await db.Product.create({
          name: data.name,
          type: data.type,
          initPrice: data.initPrice,
          truePrice: data.truePrice,
          percent: data.percent,
          isHot: data.isHot,
          isTopSearch: data.isTopSearch,
          isBoughtMany: data.isBoughtMany,
          isNew: 1,
          countInStock: data.countInStock,
          countSold: 0,
          avatar: data.avatar,
          content: data.content,
          contentHTML: data.contentHTML,
          description: data.description,
          descriptionHTML: data.descriptionHTML,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let productGetAllService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        order: [["createdAt", "DESC"]],
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let productGetSearchService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        attributes: ["id", "name", "type"],
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};
let updateProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (product) {
        product.type = data.type;
        product.initPrice = data.initPrice;
        product.truePrice = data.truePrice;
        product.percent = data.percent;
        product.isHot = data.isHot;
        product.isTopSearch = data.isTopSearch;
        product.isBoughtMany = data.isBoughtMany;
        product.isNew = data.isNew;
        product.countInStock = data.countInStock;
        product.countSold = data.countSold;
        // product.avatar = data.avatar;
        product.content = data.content;
        product.contentHTML = data.contentHTML;
        product.description = data.description;
        product.descriptionHTML = data.descriptionHTML;
        await product.save();
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No product found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateProductCountService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let carts = await db.Cart.findAll({
        where: { orderId: data.orderId },
        raw: false,
      });

      if (carts.length > 0) {
        for (const cart of carts) {
          const product = await db.Product.findOne({
            where: { id: cart.productId },
            raw: false,
          });

          if (product) {
            const countInStock = product.countInStock - cart.quantity;
            if (countInStock > 0) {
              product.countInStock = countInStock;
            } else {
              product.countInStock = 0;
            }

            product.countSold = product.countSold + cart.quantity;
            await product.save();
          }
        }

        // const countInStock = product.countInStock - data.quantity;
        // if (countInStock > 0) {
        //   product.countInStock = countInStock;
        // } else {
        //   product.countInStock = 0;
        // }

        // product.countSold = product.countSold + data.quantity;
        // await product.save();
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

let productDeleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: id },
      });
      if (product) {
        db.Product.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "Success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "No product found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProductByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let product = await db.Product.findOne({
          where: { id: id },
        });
        if (!product) product = {};
        resolve({
          errCode: 0,
          product: product,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let productGetAllTypeService = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let products = await db.Product.findAll({
          where: { type: type },
          order: [["updatedAt", "DESC"]],
        });
        if (!products) products = {};
        resolve({
          errCode: 0,
          products: products,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
// let productGetAllBrandService = (brand) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!brand) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing required parameter!",
//         });
//       } else {
//         let products = await db.Product.findAll({
//           where: { brand: brand },
//           order: [["updatedAt", "DESC"]],
//         });
//         if (!products) products = {};
//         resolve({
//           errCode: 0,
//           products: products,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
let productNewService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        where: { isNew: 1 },
        order: [["updatedAt", "DESC"]],
      });
      if (!products) products = {};
      resolve({
        errCode: 0,
        products: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let productBoughtService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        where: { isBoughtMany: 1 },
        order: [["updatedAt", "DESC"]],
      });
      if (!products) products = {};
      resolve({
        errCode: 0,
        products: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let productHotService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        where: { isHot: true },
        order: [["updatedAt", "DESC"]],
      });
      if (!products) products = {};
      resolve({
        errCode: 0,
        products: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let productPrimeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({});
      if (!products) {
        resolve({
          errCode: 0,
          products: {},
        });
      } else {
        let check = [];
        products.map((item) => {
          item.truePrice = +item.truePrice;
          check.push(item);
        });
        let products_sort = quickSort(check, "truePrice");
        let products_sort_limit = [];
        for (let i = 0; i < 10; i++) {
          products_sort_limit.push(products_sort[i]);
        }
        resolve({
          errCode: 0,
          products: products_sort_limit,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getPercentService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({});
      if (!products) {
        resolve({
          errCode: 0,
          products: {},
        });
      } else {
        let check = [];
        products.map((item) => {
          item.truePrice = +item.truePrice;
          check.push(item);
        });
        let products_sort = quickSort(products, "percent");
        let products_sort_limit = [];
        for (let i = 0; i < 10; i++) {
          products_sort_limit.push(products_sort[i]);
        }
        resolve({
          errCode: 0,
          products: products_sort_limit,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  productCreateService: productCreateService,
  productGetAllService: productGetAllService,
  updateProductService: updateProductService,
  productDeleteService: productDeleteService,
  getProductByIdService: getProductByIdService,
  productGetAllTypeService: productGetAllTypeService,
  productNewService: productNewService,
  productBoughtService: productBoughtService,
  productHotService: productHotService,
  productPrimeService: productPrimeService,
  // productGetAllBrandService: productGetAllBrandService,
  productGetSearchService: productGetSearchService,
  getPercentService: getPercentService,
  updateProductCountService: updateProductCountService,
};
