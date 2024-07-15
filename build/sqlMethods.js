"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const client = new Client({
    user: 'danielcampbell',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'social_news',
});
async function foo() {
    await client.connect();
    const res = await client.query("SELECT * FROM stories;");
    console.log(res); // Hello world!
    await client.end();
}
foo();
