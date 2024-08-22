const Cart = require("../../models/cart")

module.exports = {
  /**
    *
    * @api {get} /user/:id get user details
    * @apiName userDetails
    * @apiGroup User
    * @apiVersion  1.0.0
    * @apiPermission User
    *
    * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
    *
    * @apiParam {String} id Users unique ID.
    *
    * @apiSuccess (200) {json} name description
    *
    * @apiSuccessExample {type} Success-Response:
      {
        "error" : false,
        "user" : {
          "email": "myEmail@logic-square.com",
          "phone": "00000000000",
          "name"  : {
            "first":"Jhon",
            "last" :"Doe"
          }
        }
      }
    *
    *
  */
  async get(req, res) {
    try {
      const { id } = req.params
      const cart = await Cart.findOne({
          _id: id
        })
        .select("-password -forgotpassword")
        .exec()
      if (cart === null) throw new Error("No user found for the given id")
      return res.json({
        error: false,
        cart
      })
    } catch (err) {
      return res.status(500).json({
        error: true,
        reason: err.message
      })
    }
  }
}