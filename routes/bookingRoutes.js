const express = require('express');
const router = express.Router();
// Import matching exactly with your folder/file name
const { cancelBooking, bookEvent, getAllBookings } = require('../controller/bookingCOntroller');

router.post('/', bookEvent);
router.get('/', getAllBookings);
router.delete('/:id', cancelBooking);

module.exports = router;