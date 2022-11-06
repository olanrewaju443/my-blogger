const request = require("supertest");
const { connect } = require("./database");
const UserModel = require("../models/userModel");
const app = require("../app");

describe("user: Signup", () => {
  // let conn;

  // beforeAll(async () => {
  //     conn = await connect()
  // })

  // afterEach(async () => {
  //     await conn.cleanup()
  // })

  // afterAll(async () => {
  //     await conn.disconnect()
  // })

  it("should signup a user", async () => {
    const response = await request(app)
      .post("/signup")
      .set("content-type", "application/json")
      .send({
        password: "mich1994",
        FirstName: "Michael",
        LastName: "Adegboye",
        email: "olanrewaju443@gmailcom",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("blogs");
    expect(response.body.user).toHaveProperty("Firstname", "Michael");
    expect(response.body.user).toHaveProperty("Lastname", "Adegboye");
    expect(response.body.user).toHaveProperty(
      "email",
      "olanrewaju443@gmail.com"
    );
  });

  it("should login a user", async () => {
    // create user in out db
    const user = await UserModel.findOne({
      email: "olanrewaju443@gmail.com",
      password: "mich1994",
    });

    // login user
    const response = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "olanrewaju443@gmail.com",
        password: "mich1994",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
