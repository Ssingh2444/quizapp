CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(200),
  role VARCHAR(20),
  phone VARCHAR(50),
  avatar_url VARCHAR(255),
  bio VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS quiz_tournaments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150),
  category VARCHAR(100),
  difficulty VARCHAR(50),
  start_date DATE,
  end_date DATE,
  min_passing_score INT
);

CREATE TABLE IF NOT EXISTS attempts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  quiz_id BIGINT,
  score INT,
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  quiz_id BIGINT
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  token VARCHAR(120),
  expires_at TIMESTAMP,
  used BOOLEAN
);
