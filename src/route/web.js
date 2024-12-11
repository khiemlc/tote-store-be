const express = require("express");
const homeController = require("../controllers/homeController.js");
const userController = require("../controllers/userController.js");
const customerController = require("../controllers/customerController.js");
const productController = require("../controllers/productController.js");
const orderController = require("../controllers/orderController.js");
const adminController = require("../controllers/adminController.js");
const statisticsController = require("../controllers/statisticsController.js");
// import {protectToken} from

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  // router.post('/post-crud', (req, res, next) => protectToken(req, res, next, "admin", a), homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);

  router.get("/edit-crud", homeController.editCRUD);
  router.post("/put-crud", homeController.putCRUD);

  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-users", userController.handleCreateUser);
  router.put("/api/update-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-user-by-id", userController.handleGetOneUsers);

  //#52
  router.get("/api/allcode", userController.getAllCode);

  //router customer
  router.post("/api/sign-up", customerController.handleSignup);

  // admin
  router.get("/api/get-all-customers", adminController.customerGetAll);
  router.get("/api/get-all-admins", adminController.adminGetAll);
  router.post(
    "/api/update-customer-extra",
    adminController.updateCustomerExtra
  );

  //router product
  router.post("/api/product-create", productController.productCreate);
  router.get("/api/get-all-products", productController.productGetAll);
  router.get("/api/get-products-search", productController.productGetSearch);

  router.post("/api/update-product", productController.productUpdate);
  router.delete("/api/delete-product", productController.productDelete);
  router.get("/api/get-product-by-id", productController.getProductById);
  router.get("/api/get-all-products-type", productController.productGetAllType);
  router.get("/api/get-all-products-new", productController.productNew);
  router.get("/api/get-all-products-bought", productController.productBought);
  router.get("/api/get-all-products-hot", productController.productHot);
  router.get("/api/get-all-products-prime", productController.productPrime);
  router.put("/api/update-product-count", productController.productUpdateCount);
  // router.get(
  //   "/api/get-all-products-brand",
  //   productController.productGetAllBrand
  // );
  router.get("/api/get-percent", productController.getPercent);
  // router.get("/api/get-all-products-pagi", productController.productGetAllPagi);
  //cart
  router.post("/api/cart-add", orderController.cartAdd);
  router.delete("/api/cart-delete", orderController.cartDelete);
  router.get("/api/cart-getAll", orderController.cartGetAll);
  router.post("/api/update-cart", orderController.cartUpdate);
  //order
  router.post("/api/order-create", orderController.orderCreate);
  router.post(
    "/api/update-cart-after-order",
    orderController.cartUpdateAfterOrder
  );
  router.get("/api/get-order-by-id", orderController.getOrderById);
  router.get("/api/get-cart-by-orderId", orderController.getCartByOrderId);
  router.post("/api/status-order-cancel-req", orderController.orderCancel);
  router.get("/api/get-order-by-userId", orderController.getOrderByUserId);

  //ordermanage
  router.get("/api/get-order-checking", adminController.getOrderChecking);
  router.get("/api/get-order-status", adminController.getOrderStatus);

  router.delete("/api/order-delete", adminController.orderDelete);
  router.post("/api/update-order", adminController.orderUpdate);
  router.post("/api/update-order-status", adminController.orderUpdateStatus);
  //statistics
  router.get("/api/get-top-cus-money", statisticsController.getTopCusMoney);
  router.get("/api/get-top-order-money", statisticsController.getTopOrderMoney);

  router.get(
    "/api/get-top-product-sold",
    statisticsController.getTopProductSold
  );
  router.get(
    "/api/get-top-product-stock",
    statisticsController.getTopProductStock
  );
  router.get(
    "/api/get-top-product-sold-few",
    statisticsController.getTopProductSoldFew
  );
  router.get("/api/get-oneyear", statisticsController.getOneYear);
  return app.use("/", router);
};

module.exports = initWebRoutes;
