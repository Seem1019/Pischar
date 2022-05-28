/* eslint-disable no-undef */
import mongoose from "mongoose";
import request from "supertest";
import {Testapp} from "../src/appAndtest.modules";
// import {MongoMemoryServer} from "mongodb-memory-server";
// const {MongoClient} = require("mongodb");

// ------------------------------------------

describe("Generar un JWT de sesión", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
		mongoose
			.connect(global.__MONGO_URI__, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.catch(e);
	});

	test("Register", async () => {
		const {status} = await request(app)
			.post("/users/")
			.send(
				JSON.parse({
					username: "Corbin",
					password: "123456",
					email: "jamacea@uninorte.edu.co",
					birthDate: "2001/03/31",
					bio: "Khe kheee toma mangooo",
				})
			);
		expect(status).toBe(201);
	});
});
