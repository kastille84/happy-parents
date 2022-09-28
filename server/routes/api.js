const express = require('express');
const router = express.Router();


// # ROUTES

router.get('/', (req, res) => {
  return res.status(200).json({code: 'success'});
})
router.post('/register', (req, res) => {
  return res.status(200).json({code: 'success', data: req.body});
  // return res.status(500).json({message: 'Something went wrong. Please try again later.'});
})

module.exports = router;