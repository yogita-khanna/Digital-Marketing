const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const User = require('../models/userSchema');  // Ensure you have the user schema/model
const jwt = require('jsonwebtoken');

// Middleware to check for authentication and authorization
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, 'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    User.findById(decodedToken.id, (err, user) => {
      if (err || !user) {
        return res.status(401).send('Unauthorized');
      }

      if (user.role !== 'admin') {
        return res.status(403).send('Admin access required');
      }

      req.user = user;  // Storing user information in request
      next();
    });
  });
};

// Route to add a new service (admin only)
router.post('/add', requireAuth, async (req, res) => {
  const { title, description, icon } = req.body;
  if (!title || !description || !icon) {
    return res.status(400).send('All fields are required');
  }

  const newService = new Service({ title, description, icon });
  try {
    await newService.save();
    res.status(201).send('Service added successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to get all services (accessible to everyone)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to delete a service (admin only)
router.delete('/delete/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.status(200).send('Service deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to update a service (admin only)
router.put('/update/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body;

  if (!title || !description || !icon) {
    return res.status(400).send('All fields are required');
  }

  try {
    const service = await Service.findByIdAndUpdate(
      id,
      { title, description, icon },
      { new: true }
    );

    if (!service) {
      return res.status(404).send('Service not found');
    }

    res.status(200).send('Service updated successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
