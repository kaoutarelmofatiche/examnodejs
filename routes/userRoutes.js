const userModel = require('../models/userModel');
const express = require('express')
const router = express.Router();

const checkUserData = require('../middlewares/checkUserData');
const userController = require('../controllers/userController');

router.post('/middleware', checkUserData, userController.createUser)

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post('/unsubscribe', authMiddleware, async (req, res) => {
  try {
    const customerId = req.user.customerId;
    await stripe.subscriptions.del(customerId);
    await userModel.updateSubscription(req.user.id, 'inactive');
    res.json({ message: 'Désabonnement réussi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors du désabonnement.' });
  }
});

module.exports = router;