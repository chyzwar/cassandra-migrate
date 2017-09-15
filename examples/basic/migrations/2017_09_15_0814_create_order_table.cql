
-- up create_order_table

CREATE TABLE order(
  id UUID,
  PRIMARY KEY(id)
);

-- down create_order_table

DROP TABLE order;
