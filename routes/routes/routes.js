const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// Получение всех маршрутов
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('stops');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Расчет времени прибытия
router.get('/:id/eta', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    const eta = await calculateETA(route); // Логика из services/etaService.js
    res.json({ eta });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
