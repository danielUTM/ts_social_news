const { getClient } = require('./getClient');
const fs = require('node:fs');
var format = require('pg-format');

function read_in_query(file: String): String {
    return fs.readFileSync(`queries/${file}`, "utf-8");
}


const GET_STORIES_QUERY = read_in_query("get_stories.sql");

export interface Story {
  id: string;
  title: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}


export async function getStoriesData(search: String, sort: String, order: boolean): Promise<Story[]> {
    const client = await getClient();

    search = search ? format(`%%${sort}%%`) : format("%%");
    sort = sort ? format("%I", sort) : format("%I", "created_at");
    order = order ? format("%s", "DESC") : format("%s", "ASC")
    let sql: String = format(GET_STORIES_QUERY, search, sort, order);
    
    const res = await client.query(sql);

    await client.end()

    return res.rows
}
