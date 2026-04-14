const mongoose=require("mongoose");

const eventSchema = new mongoose.Schema({
  
  title: { type: String,
     required: true },
  date: { type: String,
     required: true },
  venue: { type: String, 
    required: true },
  seatsAvailable: { type: Number, 
    required: true },
  price: { type: Number,
     required: true },

category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: false
}
});
module.exports = mongoose.model('Event', eventSchema);

  