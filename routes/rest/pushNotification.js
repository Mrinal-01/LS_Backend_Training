const express = require('express');
const axios = require("axios");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());




module.exports = {

  async subscribe(req,res){
    res.render('notification')
  },


  async sendNotification(req,res){

    const {subscriptionId,headings,contents}=req.body
    const notification = {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_player_ids: [subscriptionId],
        headings: { en: headings },
        contents: { en: contents },
      }

  try {
      const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`
          }
      });
    //   console.log(response);
      
      
      console.log('Notification sent successfully:', response.data);
      res.json({ success: true, message: 'Notification sent successfully!' });
  } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ success: false, message: 'Failed to send notification' });
  }

}

}