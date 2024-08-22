const User = require("../../../models/user");

module.exports = {
  /**
    *
    * @api {post} /signup User registration
    * @apiName userRegistration
    * @apiGroup Auth
    * @apiVersion  1.0.0
    * @apiPermission Public
    *
    *
    * @apiParam  {String}  email
    * @apiParam  {String}  phone
    * @apiParam  {Object}  name
    * @apiParam  {String}  password
    * @apiParam  {String}  image
    * @apiParam  {Boolean} isActive
    * @apiParam  {Boolean} isAdmin
    *
    * @apiSuccess (200) {json} name description
    *
    * @apiParamExample  {json} Request-Example:
      {
        "email": "myEmail@logic-square.com",
        "phone": "00000000000",
        "name": {
          "first":"Jhon",
          "last" :"Doe"
        },
        "image":"./images/exampl.jpg",
        "isActive":true,
        "isAdmin":true,
      }
    *
    * @apiSuccessExample {json} Success-Response:
      {
        "error": false,
        "user": {
          "name": {
          "first":"Jhon",
          "last" :"Doe"
        },
          "email": "myEmail@logic-square.com",
          "phone": "00000000000",
          "isAdmin":true,
          "isActive":true,
          "image":"./images/exampl.jpg"
          }
        }
      }
    *
    *
    */
  async post(req, res) {
    try {
      const {
        name,
        email,
        phone,
        password,
        isAdmin,
        isActive,
        image,
      } = req.body;
console.log(name);


      if (email === undefined) {
        return res
          .status(400)
          .json({ error: true, reason: "Missing manadatory field `email`" });
      }
      if (name === undefined || name.firstName === undefined) {
        return res
          .status(400)
          .json({ error: true, reason: "Please specify First Name!" });
      }
      let user = await User.create({
        email,
        name,
        phone,
        password,
        isAdmin,
        isActive,
        image,
      });
      user = user.toObject();
      delete user.password;
      delete user.forgotpassword;
      delete user.isAdmin;

      return res.json({ error: false, user });
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message });
    }
  },
};
