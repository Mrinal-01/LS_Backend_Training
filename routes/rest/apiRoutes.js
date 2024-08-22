const axios = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

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
};
