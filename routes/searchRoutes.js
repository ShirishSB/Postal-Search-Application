const express = require('express');
const axios = require('axios');
const db = require('../db/db');

const router = express.Router();

// Render Search Page
router.get('/', (req, res) => {
  res.render('search', { results: [], searchType: '', searchQuery: '' });
});

// Handle Search Request
router.post('/', async (req, res) => {
  const { searchType, searchQuery } = req.body;
  let apiUrl = '';

  if (searchType === 'pincode') {
    apiUrl = `https://api.postalpincode.in/pincode/${searchQuery}`;
  } else {
    apiUrl = `https://api.postalpincode.in/postoffice/${searchQuery}`;
  }

  try {
    const response = await axios.get(apiUrl);
    const data = response.data[0];

    if (data.Status === "Success" && data.PostOffice) {
      console.log("Status:",data.Status);
      console.log("Post Offices Found:", data.PostOffice);
      res.render('search', { results: data.PostOffice, searchType, searchQuery });
    } else {
      res.render('search', { results: [], searchType, searchQuery });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.render('search', { results: [], searchType, searchQuery });
  }
});

// Save to Favourites
router.post('/favourite', (req, res) => {
  const { name, branchType, deliveryStatus, district, region, state } = req.body;

  const sql = `INSERT INTO favourites (name, branch_type, delivery_status, district, region, state) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, branchType, deliveryStatus, district, region, state], (err) => {
    if (err) console.error(err);
    res.redirect('/search');
  });
});

module.exports = router;
