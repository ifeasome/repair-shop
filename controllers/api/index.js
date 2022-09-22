const router = require('express').Router();
const shipmentRoutes = require('./shipments');
const deviceRoutes = require('./devices');
const modelRoutes = require('./models');

router.use('/shipments', shipmentRoutes);
router.use('/devices', deviceRoutes);
router.use('/models', modelRoutes);

module.exports = router;
