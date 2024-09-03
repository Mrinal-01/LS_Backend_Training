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
const pushNotification=require('./pushNotification')
const sendMail=require('./sendMail')
const stripeRoutes=require('./stripeRoutes')

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
router.post("/fetch/facbook/login",apiRoutes.facbookLogin)

router.get('/fetch/moment/test',apiRoutes.momentTest)

router.post('/pushNotification',pushNotification.sendNotification)
router.get('/subscribe',pushNotification.subscribe)

router.get('/sendMail',sendMail.sendingMail)
router.post('/send/welcomeMail',sendMail.sendWelcomeMsg)

// Here all the routes are related to stripe payment
router.post('/api/addCustomer',stripeRoutes.addCustomer)
router.get('/api/retrieveCustomer/:customerId',stripeRoutes.retrieveCustomer)
router.post('/api/addCardToCustomer',stripeRoutes.addCardToCustomer)
router.post('/api/deleteCard/',stripeRoutes.deleteCard)
router.post('/api/updateDefaultCard/',stripeRoutes.updateDefaultCard)
router.post('/api/createCharge',stripeRoutes.createCharge)
router.get('/api/getChargeList/:customerId',stripeRoutes.getChargeList)
//All are related to create a successful connect account
router.post('/create-connected-account/',stripeRoutes.createConnectedAccount)
router.post('/getPaymentLink/',stripeRoutes.getPaymentLink)
router.get('/return/',stripeRoutes.activateAccount)
router.get("/reauth", stripeRoutes.reauth);
//This one for payments in Stripe connect account
router.post('/create-connected-customer/',stripeRoutes.createConnectedCustomer)
router.post('/paymentIntent/',stripeRoutes.createPaymentIntent)
router.post('/confirm-payment/',stripeRoutes.confirmPayment)

router.get("/user/:text", users.get)

// router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/user/:id", users.get)

module.exports = router
