const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  /**
   * Creates a new Stripe customer.
   * @param {Object} customer - The customer to be created.
   * @param {string} customer.email - The email of the customer.
   * @param {string} customer.name - The name of the customer.
   * @returns {Promise.<Object>} The newly created customer object.
   */
  async createCustomer(customer) {
    try {
      const Newcustomer = await stripe.customers.create({
        email: customer.email,
        name : customer.name,
        payment_method: customer.paymentMethodId,
        invoice_settings: {
            default_payment_method: customer.paymentMethodId,
        },
    });
      return Newcustomer;
    } catch (error) {
      throw new Error("Error creating customer:", error)
    }
    // return new Promise((resolve, reject) => {
    //   stripe.customers.create({
    //     email: customer.email,
    //     name: customer.name
    //   }, (err, customer) => {
    //     if (err) {
    //       return reject(err)
    //     }
    //     return resolve(customer)
    //   })
    // })
  },
  /**
   * Retrieves a Stripe customer by its id.
   * @param {string} customerId - The id of the customer to be retrieved.
   * @returns {Promise.<Object>} The retrieved customer object.
   */
  async retrieveCustomer(customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      return error;
    }
  },

  /**
   * Adds a new card to an existing Stripe customer.
   * @param {string} customer - The id of the customer to add the card to.
   * @param {string} token - The token representing the card to be added.
   * @returns {Promise.<Object>} The response from Stripe's createSource method.
   */
  async addCardToCustomer(customer, source) {
    try {
      const stripeResponse = await stripe.customers.createSource(customer, {
        source: source,
      });
      return stripeResponse;
    } catch (error) {
      return error;
    }
  },

  /**
   * Deletes a card from an existing Stripe customer.
   * @param {string} customer - The id of the customer to delete the card from.
   * @param {string} cardId - The id of the card to be deleted.
   * @returns {Promise.<Object>} The response from Stripe's deleteSource method.
   */
  async deleteCard(customer, cardId) {
    try {
      const stripeResponse = await stripe.customers.deleteSource(
        customer,
        cardId
      );
      return stripeResponse;
    } catch (error) {
      return error;
    }
  },

  async updateDefaultCard(customer, cardId) {
    try {
      const stripeResponse = await stripe.customers.update(customer, {
        default_source: cardId,
      });
      return stripeResponse;
    } catch (error) {
      return error;
    }
  },

  async createCharges(chargeDetails) {
    try {
      const charge = await stripe.charges.create( chargeDetails);
      return charge;
    } catch (error) {
      return error;
    }
  },
  async getChargesList(customerId){
    try {
      const chargesList=await stripe.charges.list({
        customer:customerId,
        limit:1
      })
      return chargesList
    } catch (error) {
      return error
    }
  },

  async createConnectedAccount(type,country,email){
    try {
      console.log(country);
      
      const account=await stripe.accounts.create({
        type:type,
        country: country,
        email: email,
        capabilities: {
          card_payments: { requested: true },  // Request capability to accept card payments
          transfers: { requested: true },      // Request capability to make transfers
      }
      })
      return account
    } catch (error) {
      return error
    }
  },

  async getPaymentLink(accountId){
        try {
          
          
          const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: "http://localhost:3000/api/v1/reauth",
            return_url: "http://localhost:3000/api/v1/return",
            type: "account_onboarding",
          });
          return accountLink
      } catch (error) {
        return error
      }
  },

  async createConnectedCustomer(name,email,connectedAccountId){
    try {
      // Create a customer on the connected account
      const customer = await stripe.customers.create({
        name,
          email,
      }, {
          stripeAccount: connectedAccountId // Connected account ID
      });

      return customer
  } catch (error) {
      console.error('Error creating customer:', error);
      return error
  }
  },


  async createPaymentIntent(paymentData){
    const { amount, currency, connectedAccountId, customerId,paymentMthodId } = paymentData;

    try {
        // Create a PaymentIntent with transfer_data to specify the connected account
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // amount in cents
            currency,
            customer: customerId,
            payment_method_types: ['card'],
            transfer_data: {
                destination: connectedAccountId,
            },
            // payment_method : paymentMthodId,
            // confirm:true,      // This will directly confirm the payment to the connected account, don't need to run confirm payment route.
            application_fee_amount: 500, // Platform fee in cents (e.g., $5.00)
        });

        return paymentIntent
    } catch (error) {
        // console.error('Error creating PaymentIntent:', error);
        return error
    }
  },

  async confirmPayment(confirmData){
    const { paymentIntentId, paymentMethodId, customerId } = confirmData;

    try {
        // await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });
        
        return paymentIntent
    } catch (error) {
        // console.error('Error confirming PaymentIntent:', error);
        console.log("Error portion run");
        
        throw new Error(`Payment confirmation failed: ${error.message}`);
    }
}
  




};
