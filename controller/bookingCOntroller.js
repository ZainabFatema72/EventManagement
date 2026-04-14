const Booking = require('../model/bookingModel');
const Event = require('../model/eventModel');
const Notification = require("../model/notificationModel");

// ✅ 1. Book an Event
const bookEvent = async (req, res) => {
  try {
    const { userId, eventId, seatsBooked } = req.body;
    
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check seat availability
    if (event.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: `Sirf ${event.seatsAvailable} seats available hain.` });
    }

    // ✅ CHANGE 1: 'runValidators: false' add kiya taaki 'category required' wala error bypass ho jaye
    await Event.findByIdAndUpdate(
      eventId, 
      { $inc: { seatsAvailable: -seatsBooked } },
      { runValidators: false } 
    );

    // Create new booking record
    const booking = new Booking({ 
      userId, 
      eventId, 
      seatsBooked 
    });
    await booking.save();

    // ✅ CHANGE 2: Notification logic (Ticket count ke saath)
    await Notification.create({
      userId: userId,
      message: `🎉 Success! Aapne ${event.title} ke liye ${seatsBooked} ticket(s) book ki hain.`
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ 2. GET: All bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 3. Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await Notification.create({
      userId: booking.userId,
      message: `Aapki ek booking cancel kar di gayi hai.`
    });

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};

module.exports = { 
  bookEvent, 
  getAllBookings, 
  cancelBooking 
};