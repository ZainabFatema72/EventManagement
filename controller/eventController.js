const Event = require('../model/eventModel');

// GET: Get all events
// NEW (supports category filtering):
const getAllEvents = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const events = await Event.find(filter).populate("category");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};


// POST: Create a single event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

// DELETE: Delete event by ID
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// POST: Create multiple events
const createMultipleEvents = async (req, res) => {
  try {
    const events = await Event.insertMany(req.body);
    res.status(201).json({ message: 'Events created successfully', events });
  } catch (error) {
    res.status(400).json({ message: 'Error creating events', error });
  }
};
//
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      // Agar query empty hai toh empty array bhej do crash karne ke bajaye
      return res.json([]);
    }

    // Hum title aur venue dono mein search karenge kyunki aapke card mein venue dikh raha hai
    const filters = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { venue: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } } // Dono rakhte hain safety ke liye
      ]
    };

    // .populate("category") tabhi karein agar category model exist karta hai
    const events = await Event.find(filters).populate("category"); 
    
    res.json(events);
  } catch (error) {
    // Error ko console mein log karein taaki terminal mein error dikhe
    console.error("Search Error Specifics:", error); 
    res.status(500).json({ 
      message: "Search failed", 
      error: error.message // error object ki jagah message bhejein
    });
  }
};

// GET: Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("category");
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event details', error });
  }
};

// module.exports mein isse bhi add karein
module.exports = {
  getAllEvents,
  getEventById, // Ye naya add kiya
  createEvent,
  deleteEvent,
  createMultipleEvents,
  updateEvent,
  searchEvents
};
