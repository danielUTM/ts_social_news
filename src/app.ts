import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { getStoriesData, Story}  from "./sqlMethods"

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.static('static'),
  express.json());


/**
 * End point for the root.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the add story index file and success code 200
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).sendFile("static/index.html");
});

/**
 * End point for the add story page.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the add story index file and success code 200
 */
app.get("/add", (_req: Request, res: Response) => {
    res.status(200).sendFile("./static/addstory/index.html", { root: '.' });
});

/**
 * End point that returns stories from database.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the stories from the database
 */
app.get("/stories", async (req: Request, res: Response): Promise<any> => {
    let search: String = req.query.search?.toString() || "";
    let sort: String = req.query.sort!.toString().toLowerCase();
    let order: boolean = req.query.order!.toString().toLowerCase() === "descending";
    sort = sort === "created" ? "created_at" : sort === "modified" ? "updated_at" : sort;
    let dbRes: Story[] = await getStoriesData(search, sort, order);
    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(dbRes));
});

module.exports = app;