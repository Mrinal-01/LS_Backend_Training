// routes/restaurants.js

const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');
// const restaurant = require('../../models/restaurant');

// Route to add a new restaurant
module.exports = {
    async addresturant(req, res) {
        const { name, longitude, latitude } = req.body;
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
    },




    async fetchRestaurants(req,res){
        const { longitude, latitude, maxDistance } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({ error: 'Longitude and latitude are required' });
        }
        
        try {
            const nearbyRestaurants = await Restaurant.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(longitude), parseFloat(latitude)]
                        },
                        $maxDistance: maxDistance ? parseInt(maxDistance) : 20000 // Default to 5km if maxDistance isn't provided
                    }
                }
            });

            if (nearbyRestaurants.length === 0) {
                return res.status(404).json({ message: 'No nearby restaurants found' });
            }

            return res.status(200).json({ message: 'Nearby restaurants found', restaurants: nearbyRestaurants });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error'+error.message });
        }
    }
}







