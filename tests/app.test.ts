// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
import { app } from "../src/app";
import * as sql from "../src/sqlMethods";

describe('testing stories route in app file', () => {
  it("root endpoint returns 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  })

  it("stories endpoint returns 200", async () => {
    const fields: string[] = ["created_at", "id", "score", "title", "updated_at", "url"]
    const returnValue: sql.Story[] = [{"created_at": new Date(500000000000),
                             "id": 1,
                              "title": "1",
                              "updated_at": new Date(500000000000),
                              "url": "1"}]
    const mock = jest.spyOn(sql, "getStoriesData");
    mock.mockReturnValue(new Promise((resolve) => resolve(returnValue)));

    const res = await request(app).get("/stories?sort=title&order=ascending&search=aukus");
    res._body[0].updated_at = new Date(res._body[0].updated_at);
    res._body[0].created_at = new Date(res._body[0].created_at);

    expect(res.statusCode).toEqual(200);
    expect(res._body).toEqual(returnValue);
    expect(mock).toHaveBeenCalled();
    for (const field of fields) {
      expect(Object.prototype.hasOwnProperty.call(res._body[0], field));
    }
  });
});