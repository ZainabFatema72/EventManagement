const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { verifyAdmin } = require('../middleware/adminMiddleware');
const { 
  getAllEvents, getEventById, createEvent, 
  deleteEvent, createMultipleEvents, updateEvent, searchEvents 
} = require('../controller/eventController');

// Public Routes
router.get("/search", searchEvents);
router.get('/', getAllEvents);
router.get('/:id', getEventById); 

// Admin Secured Routes (Token and Role Required)
router.post('/', protect, verifyAdmin, createEvent);
router.patch('/:id', protect, verifyAdmin, updateEvent);
router.delete("/:id", protect, verifyAdmin, deleteEvent);
router.post('/many', protect, verifyAdmin, createMultipleEvents);

module.exports = router;