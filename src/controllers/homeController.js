// import { raw } from "body-parser";
const db = require("../models/index.js"); // file này import all model
const CRUDservice = require("../services/CRUDservice.js");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), // chuyển data thành chuỗi string
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let mess = await CRUDservice.createNewUser(req.body);
  //   console.log(mess);
  return res.send("post crud from server");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUsers();
  return res.render("test/displayCRUD.ejs", {
    dataTable: data,
  });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let user = await CRUDservice.getUserInforById(userId);
    return res.render("test/editCRUD.ejs", {
      user: user,
    });
  } else {
    return res.send("User not found!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDservice.updateUserData(data);
  return res.redirect("/get-crud");
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;

  if (id) {
    await CRUDservice.deleteUser(id);
    return res.send("delete!");
  } else {
    return res.send("no id");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
