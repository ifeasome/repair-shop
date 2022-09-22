\c repair_db;

BEGIN;

INSERT INTO addresses (street, city, state, postal_code)
VALUES
  ('Mulberry Road', 'Glendale', 'CA', 91020),
  ('Arrowhead Drive', 'Tombestone', 'AZ', 85638),
  ('Virginia Avenue', 'Jackson', 'WY', 83002),
  ('Windy Lane', 'Chicago', 'IL', 60176);

INSERT INTO shipments (tracking_number, expected_arrival, address_id)
VALUES
  ('RA774410470US', NOW() - INTERVAL '2 DAYS', 2),
  ('RA396150753US', NOW() + INTERVAL '3 DAYS', 3),
  ('RA000261598US', NOW() + INTERVAL '5 DAYS', 1),
  ('RA308490348US', NOW() - INTERVAL '1 DAYS', 4),
  ('RA231938226US', NOW() + INTERVAL '7 DAYS', 2),
  ('RA475228415US', NOW() - INTERVAL '5 DAYS', 4),
  ('RA802876018US', NOW() + INTERVAL '2 DAYS', 1);

INSERT INTO shipping_updates (updated_on, status, location, shipment_id)
VALUES
  (NOW() - INTERVAL '1 DAYS', 'Delivered', 'Tombestone, AZ', 1),
  (NOW() + INTERVAL '2 HOURS', 'In-transit', 'Cleaveland, OH', 2),
  (NOW() - INTERVAL '1 DAYS', 'Packaging', 'Lewiston, ME', 3),
  (NOW() - INTERVAL '12 HOURS', 'In-transit', 'Phoenix, AZ', 3),
  (NOW() - INTERVAL '1 HOURS', 'Delivered', 'Chicago, IL', 4),
  (NOW() + INTERVAL '2 DAYS', 'Lost', 'Tombestone, AZ', 5),
  (NOW() + INTERVAL '4 DAYS', 'In-transit', 'Chico, CA', 5),
  (NOW() - INTERVAL '7 DAYS', 'In-transit', 'Salem, OR', 6),
  (NOW() + INTERVAL '1 DAYS', 'In-transit', 'Austin, TX', 7);

INSERT INTO platforms (name)
VALUES ('Android'), ('iOS'), ('Windows');

INSERT INTO models (name, screen_size, platform_id)
VALUES
  ('Samsung Galaxy A51', 6.5, 1),
  ('iPhone 12 Pro Max', 6.7, 2),
  ('Lumia 950 XL', 5.7, 3);

INSERT INTO devices (condition, notes, model_id)
VALUES
  (9, NULL, 1),
  (7, 'slight crack in screen', 1),
  (2, 'device won''t turn on', 2),
  (4, 'screen isn''t damaged but is not responsive to touch', 3);

COMMIT;
