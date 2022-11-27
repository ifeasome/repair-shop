const router = require('express').Router();

const authRoutes = require('./auth');
const htmlRoutes = require('./htmlRoutes');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/', htmlRoutes);

module.exports = router;
