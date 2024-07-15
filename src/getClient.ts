const { Client } = require('pg');

module.exports.getClient = async () => {
  const client = new Client({
	    user: 'danielcampbell',
	    password: 'password',
	    host: 'localhost',
	    port: 5432,
	    database: 'social_news',
    });
  await client.connect();
  return client;
};