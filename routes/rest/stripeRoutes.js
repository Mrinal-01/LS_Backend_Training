const express = require("express");
const stripeLib = require("../../lib/stripe");

const app = express();

module.exports = {
  /**
   * Creates a new Stripe customer.
   * @param {Object} customer - The customer to be created.
   * @param {string} customer.email - The email of the customer.
   * @param {string} customer.name - The name of the customer.
   * @returns {Promise.<Object>} The newly created customer object.
   */
  async addCustomer(req, res) {
    try {
      const customer = req.body;
      const newCustomer = await stripeLib.createCustomer(customer);
      return res.status(200).send(newCustomer);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Retrieves a Stripe customer by its id.
   * @param {string} customerId - The id of the customer to be retrieved.
   * @returns {Promise.<Object>} The retrieved customer object.
   */
  async retrieveCustomer(req, res) {
    try {
      const customerId = req.params.customerId;
      const customer = await stripeLib.retrieveCustomer(customerId);
      return res.status(200).send(customer);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async addCardToCustomer(req, res) {
    try {
      const { customer, source } = req.body;
      const newCard = await stripeLib.addCardToCustomer(customer, source);
      
      res.status(200).send(newCard);
    } catch (error) {
      res.status(400).json({error:error.message});
    }
  },

  async deleteCard(req, res) {
    try {
      const { customer, cardId } = req.body;
      const deletedCard = await stripeLib.deleteCard(customer, cardId);
      return res.status(200).send(deletedCard);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async updateDefaultCard(req, res) {
    try {
      const { customer, cardId } = req.body;
      const updatedCard = await stripeLib.updateDefaultCard(customer, cardId);
      return res.status(200).send(updatedCard);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

async createCharge(req,res){
  try {
    const chargeDetails=req.body
    const charge=await stripeLib.createCharges(chargeDetails)
    return res.status(200).send(charge)
  } catch (error) {
    return res.status(400).json(error)
  }
},

async getChargeList(req,res){
  try {
    const {customer}=req.params
    const charges=await stripeLib.getChargesList(customer)
    return res.status(200).json(charges)
  } catch (error) {
    return res.status(400).json(error)
  }
},

async createConnectedAccount(req,res){
  try {
      const {type,country,email}=req.body
      const connectedAcc=await stripeLib.createConnectedAccount(type,country,email)
      res.status(200).json({accountId : connectedAcc.id})
  } catch (error) {
    res.status(400).send({error: error.message})
  }
},

async getPaymentLink(req,res){
  try {
    
    const {accountId}=req.body;
    const paymentUrl=await stripeLib.getPaymentLink(accountId)
    return res.status(200).json(paymentUrl)
  } catch (error) {
    return res.status(400).json(error)
  }
},
async activateAccount(req,res){
  res.send('Account activated successfully');
},
async reauth(req,res){
   // Inform users they need to re-authenticate or provide additional information
   res.send("Please re-authenticate or provide additional information.");
},

async createConnectedCustomer(req,res){
  try {
    const { name,email, connectedAccountId } = req.body;
    const customer = await stripeLib.createConnectedCustomer(name,email,connectedAccountId);

  res.status(200).json({ customer });

  } catch (error) {
    res.status(400).json({error:error.message})
  }
},

async createPaymentIntent(req,res){
  try {
    console.log("Router start");
    
    const paymentData	=req.body
    const paymentIntent=await stripeLib.createPaymentIntent(paymentData)
    return res.status(200).send(paymentIntent)
  } catch (error) {
    return res.status(400).send(error)
  }
},

async confirmPayment(req,res){
  try {
      const confirmData=req.body
      const confirmDetails=await stripeLib.confirmPayment(confirmData)
      console.log("Payment confirmed",confirmDetails.amount);
      
    return res.status(200).json(confirmDetails)
  } catch (error) {
    console.error('Error in route handling payment confirmation:', error.message);
    res.status(500).json({ error: error.message });
  }
}






};
