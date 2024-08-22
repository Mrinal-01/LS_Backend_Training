const express = require("express")
const router = express.Router()
const expressJwt = require("express-jwt")
const checkJwt = expressJwt({ secret: process.env.SECRET, algorithms: ['RS256'] }) // the JWT auth check middleware

const users = require("./users")
const login = require("./auth")
const signup = require("./auth/signup")
const forgotpassword = require("./auth/password")
const product = require("./products")
const restaurant = require("./restaurants")
const apiRoutes=require("./apiRoutes")

router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX


router.get("/products/:company?", product.get)
router.post("/restaurants/add", restaurant.addresturant)
router.get("/fetch/restaurants", restaurant.fetchRestaurants)

router.get("/fetch/apiRoutes/:id", apiRoutes.fetchFakeApi)
router.get("/fetch/user/:token",apiRoutes.userDetails)
router.post("/fetch/user/login/:token?",apiRoutes.login)




router.get("/user/:text", users.get)

router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/user/:id", users.get)

module.exports = router
