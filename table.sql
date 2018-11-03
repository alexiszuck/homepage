CREATE TABLE log_visits (
  id            SERIAL PRIMARY KEY,
  user_id       VARCHAR(36) NOT NULL,
  user_agent    VARCHAR(254) NOT NULL,
  ip_address    VARCHAR(15) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO log_visits (user_id, user_agent, ip_address) VALUES ('1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0', '110.169.248.151') RETURNING id;

