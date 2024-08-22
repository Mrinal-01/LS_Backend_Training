// routes/restaurants.js

const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Route to add a new restaurant
router.post('/add', async (req, res) => {
    const { name, longitude, latitude } = req.body;
    console.log("Kiran");
    
  console.log(req.body);
  
    // Validate the input
    if (!name || !longitude || !latitude) {
        return res.status(400).json({ error: 'Name, longitude, and latitude are required' });
    }

    try {
        const newRestaurant = await Restaurant.create({
            name,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
        });

        return res.status(201).json({ message: 'Restaurant added successfully', newRestaurant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
