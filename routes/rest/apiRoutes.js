const express = require('express');
const axios = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const moment=require('moment')

const app = express();
app.use(bodyParser.json());

module.exports = {
  async fetchFakeApi(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos/",
        {
          params: {
            id: id,
          },
        }
      );
      //apiData will return an array of objects
      const apiData = response.data[0];

      // return res.status(200).json(apiData);

      res.render("apiTest", {
        albumId: apiData.albumId,
        id: apiData.id,
        title: apiData.title,
        imgSrc: apiData.url,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async userDetails(req, res) {
    try {
      const { token } = req.params;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      );
      const data = response.data;
      // return res.status(200).json(data)
      console.log(data);

      return res.render("userDetails", { userData: data });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { token } = req.params;

      
      if (token === undefined)
        throw new Error("Invalid Token or Token Missing");
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      );
      
      const user =await User.findOne({ email: response.data.email }).exec();
      if (user === undefined)
        return new Error("User not registered! Plz register first.");

      

      const payload = {
        id: user._id,
        _id: user._id,
        fullName: user.name.full,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      };

      console.log(user.name.full);

      const jwtToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 3600 * 24 * 30, // 1 month
      });
      res
        .status(200)
        .json({ email: user.email, fullName: user.name.full, Token: jwtToken });
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  },

  async facbookLogin(req,res){
    const APP_ID = '1040856910719272';
    const APP_SECRET = '236732a2eebb2f3ef4528b1111cd4d7e';

    try {
      const { access_token } = req.body;
      if (!access_token) {
          return res.status(400).json({ error: 'Access token is required' });
      }

      // Validate the token with Facebook
      const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`);
      const { id, name,email } = response.data;
      const picture = response.data.picture.data.url;
      const user =await User.findOne({ email: email }).exec();
      if (user === undefined)
        throw new Error("User not registered! Plz register first.");

      

      const payload = {
        
        _id: user._id,
        socialId:id,
        socialImage:picture,
        fullName: user.name.full,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      };


      // Generate JWT token
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 * 30 });

      

      // Return the JWT token and user details
      return res.json({
          token,
          user: {
              name,
              email,
              picture
          }
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to authenticate with Facebook' });
  }
  },


async momentTest(req,res){
    try {
      let now=moment().toString()
      console.log(now);
    
      let specificDate = moment("2024-08-23");
      console.log(specificDate);

      var a = moment.locale("en");
         var c = moment().format("LLLL");
      console.log(c);
      
      
      

      res.status(200).json({Success:"Check console plz"})
    } catch (error) {
      res.status(400).json({error:true,message:error.message})
    }
}


};
