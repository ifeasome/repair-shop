const db = require('../config/connection');

class Shipment {
  getTrackingInfo(tracking_number) {
    return db.query(
      `WITH updates AS (
        SELECT shipments.*, 
        array_to_json(array_agg(shipping_updates ORDER BY updated_on DESC)) AS updates
        FROM shipments
        LEFT JOIN shipping_updates 
        ON shipments.id = shipping_updates.shipment_id
        WHERE shipments.tracking_number = $1
        GROUP BY shipments.id
      )
      SELECT updates.*, row_to_json(addresses) AS address FROM updates
      LEFT JOIN addresses ON addresses.id = updates.address_id`,
      [tracking_number]
    );
  }

  createShipment({ tracking_number, expected_arrival, address_id }) {
    return db.query(
      'INSERT INTO shipments(tracking_number, expected_arrival, address_id) VALUES($1, $2, $3) RETURNING *',
      [tracking_number, expected_arrival, address_id]
    );
  }
}

module.exports = new Shipment();
