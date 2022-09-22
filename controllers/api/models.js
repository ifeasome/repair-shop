const router = require('express').Router();
const { Model } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const { rows } = await Model.getAll();
    
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
