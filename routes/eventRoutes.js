const express = require('express');
const router = express.Router();
const { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  deleteEvent, 
  createMultipleEvents, 
  updateEvent, 
  searchEvents 
} = require('../controller/eventController');

// ✅ Sabse pehle search route
router.get("/search", searchEvents);
// 2. GET all events
router.get('/', getAllEvents);

// 3. GET single event by ID
router.get('/:id', getEventById); 

// 4. POST routes
router.post('/', createEvent);
router.post('/many', createMultipleEvents);

// 5. UPDATE & DELETE
router.patch('/:id', updateEvent);
router.delete("/:id", deleteEvent);


// Baaki routes uske niche
router.get("/", getAllEvents);
router.get("/:id", getEventById); 

module.exports = router;