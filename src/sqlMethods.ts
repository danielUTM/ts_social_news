// eslint-disable-next-line @typescript-eslint/no-var-requires
const getClient = require('./getClient');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const format = require('pg-format');
import fs from 'node:fs';

function read_in_query(file: string): string {
    return fs.readFileSync(`queries/${file}`, "utf-8");
}


const GET_STORIES_QUERY = read_in_query("get_stories.sql");

export interface Story {
  id: number;
  title: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}


export async function getStoriesData(search: string, sort: string, order: boolean): Promise<Story[]> {
    const client = await getClient();

    search = search ? format(`%%${sort}%%`) : format("%%");
    sort = sort ? format("%I", sort) : format("%I", "created_at");
    order = order ? format("%s", "DESC") : format("%s", "ASC")
    const sql: string = format(GET_STORIES_QUERY, search, sort, order);
    
    const res = await client.query(sql);

    await client.end()

    return res.rows
}
