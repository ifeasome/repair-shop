const db = require('../config/connection');

class User {
  findUser({ username, password }) {
    return db.query(
      `SELECT id FROM users
      WHERE PGP_SYM_DECRYPT(username::bytea, $3) = $1
      AND PGP_SYM_DECRYPT(password::bytea, $3) = $2`,
      [ username, password, process.env.ENCRYPTION_KEY ]
    );
  }

  create({ username, password }) {
    return db.query(
      `INSERT INTO users (username, password)
      VALUES(PGP_SYM_ENCRYPT($1, $3), PGP_SYM_ENCRYPT($2, $3))`,
      [ username, password, process.env.ENCRYPTION_KEY ]
    );
  }
}

module.exports = new User();
