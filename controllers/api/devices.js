const router = require('express').Router();
const { Device } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const { rows } = await Device.getAll();
    
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await Device.create(req.body);

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { rowCount } = await Device.update({ 
      id: req.params.id,
      notes: req.body.notes
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await Device.delete({
      id: req.params.id
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
