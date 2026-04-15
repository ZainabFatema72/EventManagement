const Event = require('../model/eventModel');

// GET: Get all events
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
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// POST: Create a single event
const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id // Protect middleware se user ID milti hai
    };
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
};

// UPDATE: Update event by ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

// DELETE: Delete event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

// POST: Create multiple events
const createMultipleEvents = async (req, res) => {
  try {
    const events = await Event.insertMany(req.body);
    res.status(201).json({ message: 'Events created successfully', events });
  } catch (error) {
    res.status(400).json({ message: 'Error creating events', error: error.message });
  }
};

// GET: Search events
const searchEvents = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const filters = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { venue: { $regex: query, $options: "i" } }
      ]
    };
    const events = await Event.find(filters).populate("category");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// GET: Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("category");
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event details', error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
  createMultipleEvents,
  updateEvent,
  searchEvents
};