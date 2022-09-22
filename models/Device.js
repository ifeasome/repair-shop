const db = require('../config/connection');

class Device {
  getAll() {
    return db.query(
      `SELECT devices.*, models.name AS model,
      models.screen_size, platforms.name AS platform
      FROM devices
      LEFT JOIN models ON devices.model_id = models.id
      LEFT JOIN platforms ON models.platform_id = platforms.id
      ORDER BY date_received DESC`
    );
  }

  create({ condition, notes, model_id }) {
    return db.query(
      `WITH new_device AS (
        INSERT INTO devices (condition, notes, model_id)
        VALUES ($1, $2, $3) RETURNING *
      )
      SELECT new_device.*, models.name AS model,
      models.screen_size, platforms.name AS platform
      FROM new_device
      LEFT JOIN models ON new_device.model_id = models.id
      LEFT JOIN platforms ON models.platform_id = platforms.id`, 
      [ condition, notes, model_id ]
    );
  }

  update({ notes, id }) {
    return db.query(
      `UPDATE devices SET notes = $1 WHERE id = $2 RETURNING *`, 
      [ notes, id ]
    );
  }

  delete({ id }) {
    return db.query(`DELETE FROM devices WHERE id = $1`, [ id ]);
  }
}

module.exports = new Device();
