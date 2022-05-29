/* eslint-disable no-undef */
import mongoose from "mongoose";
import request from "supertest";
import { Testapp } from "../src/appAndtest.modules";
// import {MongoMemoryServer} from "mongodb-memory-server";
// const {MongoClient} = require("mongodb");

// ------------------------------------------

describe("Generar un JWT de sesión", () => {
  let app;
  beforeAll(() => {
    app = Testapp();
    mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  let _body;
  test("Register", async () => {
    const { status, body } = await request(app).post("/users/").send({
      username: "Corbin",
      password: "123456",
      email: "jamacea@uninorte.edu.co",
      birthDate: "2001/03/31",
      bio: "Khe kheee toma mangooo",
    });

    _body = { token: body };
    expect(_body).toBeDefined();
    expect(status).toBe(201);
  });

  test("login with user and password", async () => {
    const { status, body } = await request(app).post("/users/login").send({
      username: "Corbin",
      password: "123456",
    });
    expect(status).toBe(200);
    expect(body).toBeDefined();
  });

  test("Login succesful", async () => {
    const { status, body } = await request(app)
      .post("/users/login")
      .send(_body);
    expect(status).toBe(200);
    expect(body).toEqual({});
  });
});
