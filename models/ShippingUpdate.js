const db = require('../config/connection');

class ShippingUpdate {
  create({ updated_on, status, location, shipment_id }) {
    return db.query(
      'INSERT INTO shipping_updates(updated_on, status, location, shipment_id) VALUES($1, $2, $3, $4) RETURNING *',
      [updated_on, status, location, shipment_id]
    );
  }
}

module.exports = new ShippingUpdate();
