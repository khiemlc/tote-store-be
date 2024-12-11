const userService = require("../services/userService.js");
const createTokenRandom = require("../util/randomToken.js");

let handleLogin = async (req, res) => {
  try {
    let { action } = req.body;
    let email = req.body.email;
    let password = req.body.password;

    // lỗi thiếu trường
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing input!",
      });
    }
    let userData = await userService.handleUserLogin(email, password);
    let token = await createTokenRandom({ email: userData?.email, action });
    // console.log("token" + JSON.stringify(token));
    //access token : JWT jison web token => cơ chế bảo mật
    return res
      .cookie("shop_cookie_admin", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 10 * 24 * 3600000),
      })
      .status(200)
      .json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
      });
  } catch (e) {
    console.log(e);
  }
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateUser = async (req, res) => {
  let message = await userService.createUser(req.body);
  return res.status(200).json(message);
};
let handleUpdateUser = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
  }
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  } else {
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
  }
};
let handleGetOneUsers = async (req, res) => {
  try {
    let user = await userService.handleGetOneUsersService(req.query.id);

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Can not get order from server ...",
    });
  }
};
// #52
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all err", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateUser: handleCreateUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  handleGetOneUsers: handleGetOneUsers,
};
