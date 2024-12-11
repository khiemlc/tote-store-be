const customerService = require("../services/customerService.js");
let handleSignup = async (req, res) => {
  try {
    let infor = await customerService.customerSignup(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};

module.exports = { handleSignup: handleSignup };
