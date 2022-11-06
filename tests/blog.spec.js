const request = require("supertest");
const { connect } = require("./database");
const app = require("../app");
const moment = require("moment");
const blogModel = require("../models/blogModel");
const UserModel = require("../models/userModel");

describe("Blog Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

    await UserModel.findOne({
      email: "olanrewaju443@gmail.com",
      password: "mich1994",
    });

    const loginResponse = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "olanrewaju443@gmail.com",
        password: "mich1994",
      });

    token = loginResponse.body.token;
  });

  // afterEach(async () => {
  //     await conn.cleanup()
  // })

  // afterAll(async () => {
  //     await conn.disconnect()
  // })

  it("should return Blogs", async () => {
    // create order in our db
    await blogModel.create({
      title: "Ask Solomon",
      description: "Life of a secondary school student",
      state: "published",
      tags: "Irony",
      body: "Solomon had to learn the difference between vision and personal aspirations",
    });

    const response = await request(app)
      .get("/blogs")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Blogs");
    expect(response.body).toHaveProperty("status", true);
  });

  it("should return Blogs with state 2", async () => {
    // create blog in our db
    await blogModel.create({
      state: 1,
      created_at: moment().toDate(),
      items: [{ title: "Kitchen recipe", author: "Ten hag", tags: "food" }],
    });

    await blogModel.create({
      state: 2,
      created_at: moment().toDate(),
      items: [{ title: "Kitchen recipe", author: "Ten hag", tags: "food" }],
    });

    const response = await request(app)
      .get("/blogs?state=2")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Blogs");
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.Blogs.every((Blog) => Blog.state === 2)).toBe(true);
  });
});
