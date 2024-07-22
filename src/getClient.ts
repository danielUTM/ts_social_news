const { Client } = require('pg');
import dotenv from "dotenv"
dotenv.config();
const USERNAME = process.env.USERNAME;

module.exports.getClient = async () => {
  const client = new Client({
	    user: USERNAME,
	    password: 'password',
	    host: 'localhost',
	    port: 5432,
	    database: 'social_news',
    });
  await client.connect();
  return client;
};