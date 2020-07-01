const express = require('express')
const router = express.Router()

const Tickets = require('../models/Tickets');

router.post('/api/tickets', (req, res) => {
  const { body } = req;
  const newProduct = new Tickets(body);
  newProduct.save()
    .then(mongoRes => res.status(201).json(mongoRes))
    .catch(err => res.status(400).json(err));
});

router.get('/api/tickets', (req, res) => {
  Tickets.find()
    .then(mongoRes => res.status(201).json(mongoRes))
    .catch(err => res.status(400).json(err));
});

router.get('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  Tickets.findById(id)
  .populate('products')
    .then(mongoRes => res.status(200).json(mongoRes))
    .catch(err => res.status(400).json(err));
});

router.patch('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Tickets.findByIdAndUpdate(id, body, { new: true })
    .then(mongoRes => res.status(200).json(mongoRes))
    .catch(err => res.status(400).json(err));
});

router.delete('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  Tickets.findByIdAndDelete(id)
    .then(() => res.status(204).json())
    .catch(err => res.status(400).json(err));
});

module.exports = router;