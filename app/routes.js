const express = require('express');
const db = require('../config/database');
const router = express.Router();

router.post('/layout_preference', function(req, res) {
  // update db with layout preference
});

router.post('/color_preference', function(req, res) {
  // update db with color preference
});

router.post('/title_preference', function(req, res) {
  // update db with title preference
});