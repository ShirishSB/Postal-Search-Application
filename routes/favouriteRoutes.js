const express = require('express');
const db = require('../db/db');

const router = express.Router();

// Render Favourites Page
router.get('/', (req, res) => {
  db.query('SELECT * FROM favourites', (err, results) => {
    if (err) console.error(err);
    res.render('favourites', { favourites: results });
  });
});

module.exports = router;
