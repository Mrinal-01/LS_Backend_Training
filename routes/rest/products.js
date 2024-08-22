
const Product = require("../../models/product")

module.exports = {

  /**
   * Fetch all the Products by company
   * @api {get} /products/:company 1.0 Fetch all the Products by company
   * @apiName fetchProducts
   * @apiGroup Product
   * @apiPermission Public
   *
   * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
   * 
   * @apiParam {String} id `URL Param` The _id of the Product to find
   *
   * @apiSuccessExample {type} Success-Response: 200 OK
   * {
   *     error : false,
   *     products: [{}]
   * }
   */
  async find(req, res) {
    try {
      console.log("*******")
      const products = await Product.find({ }).exec()
      return res.json({ error: false, products })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  /**
   * Find a Product by _id
   * @api {get} /product/:id 2.0 Find a Product by _id
   * @apiName getProduct
   * @apiGroup Product
   * @apiPermission Public
   *
   * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
   *
   * @apiParam {String} id `URL Param` The _id of the Product to find
   *
   * @apiSuccessExample {type} Success-Response: 200 OK
   * {
   *     error : false,
   *     product: {}
   * }
   */
  async get(req, res) {
    try {
      const product = await Product.findOne({ _id: req.params.id }).exec()
      return res.json({ error: false, product })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  /**
   * Create a new Product
   * @api {post} /product 3.0 Create a new Product
   * @apiName createProduct
   * @apiGroup Product
   * @apiPermission Public
   *
   * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
   *
   * @apiParam  {String} name Product name
   * @apiParam  {Number} price Product price
   * @apiParam  {Number} sellPrice Product sellPrice
   * @apiParam  {Number} stockQuantity Product stockQuantity
   * @apiParam  {String} image Product image
   * @apiParam  {String} [description] Product description
   *
   * @apiSuccessExample {type} Success-Response: 200 OK
   * {
   *     error : false,
   *     product: {}
   * }
   */
  async post(req, res) {
    try {
      const {
        name, description, price, sellPrice, stockQuantity, image, createdAt, updatedAt
      } = req.body
      if (name === undefined) return res.status(400).json({ error: true, reason: "Missing manadatory field 'name'" })
      if (price === undefined) return res.status(400).json({ error: true, reason: "Missing manadatory field 'price'" })
      if (sellPrice === undefined) return res.status(400).json({ error: true, reason: "Missing manadatory field 'sellPrice'" })
      if (stockQuantity === undefined) return res.status(400).json({ error: true, reason: "Missing manadatory field 'stockQuantity'" })
      if (image === undefined) return res.status(400).json({ error: true, reason: "Missing manadatory field 'image'" })
      const product = await Product.create({
        name, description, price, sellPrice, stockQuantity, image, createdAt, updatedAt
      })
      return res.json({ error: false, product })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  /**
   * Edit a Product by _id
   * @api {put} /product/:id 4.0 Edit a Product by _id
   * @apiName editProduct
   * @apiGroup Product
   * @apiPermission Public
   *
   * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
   *
   * @apiParam {String} id `URL Param` The _id of the Product to edit

   * @apiParam  {String} [description] Product description
   * @apiParam  {Date} [createdAt] Product createdAt
   * @apiParam  {Date} [updatedAt] Product updatedAt
   *
   * @apiSuccessExample {type} Success-Response: 200 OK
   * {
   *     error : false,
   *     product: {}
   * }
   */
  async put(req, res) {
    try {
      const {
        name, description, price, sellPrice, stockQuantity, image, createdAt, updatedAt
      } = req.body
      const product = await Product.findOne({ _id: req.params.id }).exec()
      if (product === null) return res.status(400).json({ error: true, reason: "No such Product!" })

      if (name !== undefined) product.name = name
      if (description !== undefined) product.description = description
      if (price !== undefined) product.price = price
      if (sellPrice !== undefined) product.sellPrice = sellPrice
      if (stockQuantity !== undefined) product.stockQuantity = stockQuantity
      if (image !== undefined) product.image = image
      if (createdAt !== undefined) product.createdAt = createdAt
      if (updatedAt !== undefined) product.updatedAt = updatedAt

      await product.save()
      return res.json({ error: false, product })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  },

  /**
   * Delete a Product by _id
   * @api {delete} /product/:id 4.0 Delete a Product by _id
   * @apiName deleteProduct
   * @apiGroup Product
   * @apiPermission Public
   *
   * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
   *
   * @apiParam {String} id `URL Param` The _id of the Product to delete
   *
   * @apiSuccessExample {type} Success-Response:
   * {
   *     error : false,
   * }
   */
  async delete(req, res) {
    try {
      await Product.deleteOne({ _id: req.params.id })
      return res.json({ error: false })
    } catch (err) {
      return res.status(500).json({ error: true, reason: err.message })
    }
  }

}
