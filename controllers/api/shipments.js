const router = require('express').Router();
const { Shipment, ShippingUpdate } = require('../../models');
const crypto = require('crypto');

router.get('/:tracking_number', async (req, res) => {
  try {
    const { rows, rowCount } = await Shipment.getTrackingInfo(
      req.params.tracking_number
    );
    
    if (rowCount > 0) {
      res.status(200).json(rows[0]);
    }
    else {
      res.status(404).end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const newShipmentEntry = {
      tracking_number: crypto.randomBytes(16).toString('hex').concat('US'),
      expected_arrival: new Date(req.body.expected_arrival),
      address_id: req.body.address_id,
    };

    const { rows } = await Shipment.createShipment(newShipmentEntry);

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

router.post('/:id/update', async (req, res) => {
  try {
    const updateRecord = {
      updated_on: new Date(),
      status: req.body.status,
      location: req.body.location,
      shipment_id: req.params.id,
    };

    const { rows } = await ShippingUpdate.create(updateRecord);

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

module.exports = router;
