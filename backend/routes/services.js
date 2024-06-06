const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const jwt = require('jsonwebtoken');

// Middleware to check if the user is admin
const isAdmin = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      req.user = decoded;
      next();
    } else {
      res.status(403).send('Access denied');
    }
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

// Route to add a new service (admin only)
router.post('/add', async (req, res) => {
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
router.delete('/delete/:id', async (req, res) => {
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
router.put('/update/:id', async (req, res) => {
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
