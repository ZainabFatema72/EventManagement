const mongoose=require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'//another vtable
  },
  
  seatsBooked: Number,
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
