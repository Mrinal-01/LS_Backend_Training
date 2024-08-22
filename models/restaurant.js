const mongoose=require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String, // 'type' field within 'location'
            enum: ['Point'], // This is the only value allowed
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers: [longitude, latitude]
            required: true
        }
    }
  });
  
  // Create a 2dsphere index on the 'location' field
  restaurantSchema.index({ location: '2dsphere' });
  
  module.exports = mongoose.model('Restaurant', restaurantSchema);
  