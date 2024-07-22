const app = require("../src/app");
const request = require("supertest");
import {
  Story,
} from "../src/sqlMethods";
const sql = require("../src/sqlMethods");

describe('testing stories route in app file', () => {
  it("root endpoint returns 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  })

  it("stories endpoint returns 200", async () => {
    let fields: String[] = ["created_at", "id", "score", "title", "updated_at", "url"]
    let returnValue: Story[] = [{"created_at": new Date(500000000000),
                             "id": 1,
                              "title": "1",
                              "updated_at": new Date(500000000000),
                              "url": "1"}]
    const spy = jest.spyOn(sql, "getStoriesData");
    spy.mockReturnValue(returnValue);

    const res = await request(app).get("/stories?sort=title&order=ascending&search=aukus");
    res._body[0].updated_at = new Date(res._body[0].updated_at);
    res._body[0].created_at = new Date(res._body[0].created_at);

    expect(res.statusCode).toEqual(200);
    expect(res._body).toEqual(returnValue);
    expect(spy).toHaveBeenCalled();
    for (let field of fields) {
      expect(res._body[0].hasOwnProperty(field));
    }
  });
});