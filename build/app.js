"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(express_1.default.static('static'), express_1.default.json());
/**
 * End point for the root.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the add story index file and success code 200
 */
app.get("/", (_req, res) => {
    res.status(200).sendFile("static/index.html");
});
/**
 * End point for the add story page.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the add story index file and success code 200
 */
app.get("/add", (_req, res) => {
    res.status(200).sendFile("./static/addstory/index.html", { root: '.' });
});
/**
 * End point that returns stories from database.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the stories from the database
 */
app.get("/stories", (req, res) => {
    var _a;
    let search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    let sort = req.query.sort.toString().toLowerCase();
    let order = req.query.order.toString().toLowerCase() === "descending";
    sort = sort === "created" ? "created_at" : sort === "modified" ? "updated_at" : sort;
    res.status(200);
});
// @app.route("/stories", methods=["GET"])
// def get_stories() -> tuple[dict, int]:
//     """Returns all stories stored on the server."""
//     args = request.args.to_dict()
//     search = args.get("search", "")
//     sort = args.get("sort").lower()
//     order = args.get("order").lower() == "descending"
//     sort = "created_at" if sort == "created" else "updated_at" if sort == "modified" else sort
//     res = get_stories_data(conn, search, sort, order)
//     if ERROR_MSG in res:
//         return jsonify(res), 404
//     return jsonify(res), 200
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
