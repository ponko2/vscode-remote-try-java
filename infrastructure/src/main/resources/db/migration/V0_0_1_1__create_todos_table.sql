CREATE TABLE todos
(
  id char(36) NOT NULL,
  title varchar(255) NOT NULL,
  completed boolean DEFAULT '0' NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
