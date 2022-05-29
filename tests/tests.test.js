/* eslint-disable no-undef */
import mongoose from "mongoose";
import request from "supertest";
import {Testapp} from "../src/appAndtest.modules";
// import {MongoMemoryServer} from "mongodb-memory-server";
// const {MongoClient} = require("mongodb");

// ------------------------------------------
let _body;
let _body2;

describe("Register", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
		mongoose.connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	});

	test("All information", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Corbin",
			password: "123456",
			email: "jamacea@uninorte.edu.co",
			birthDate: "2001/03/31",
			bio: "Khe kheee toma mangooo",
		});

		_body = {token: body};
		expect(_body).toBeDefined();
		expect(status).toBe(201);
	});

	test("Incomplete information: username", async () => {
		const {status, body} = await request(app).post("/users/").send({
			// username: "Corbino",
			password: "123456",
			email: "jamacea@gmail.com",
			birthDate: "2001/03/31",
			bio: "Khe kheee toma mangooo",
		});

		expect(status).toBe(400);
		expect(body).toBeDefined;
	});

	test("Incomplete information: password", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Corbino",
			// password: "123456",
			email: "jamacea@gmail.com",
			birthDate: "2001/03/31",
			bio: "Khe kheee toma mangooo",
		});

		expect(status).toBe(400);
		expect(body).toBeDefined;
	});

	test("Incomplete information: email", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Corbino",
			password: "123456",
			// email: "jamacea@gmail.com",
			birthDate: "2001/03/31",
			bio: "Khe kheee toma mangooo",
		});

		expect(status).toBe(400);
		expect(body).toBeDefined;
	});

	test("Incomplete information: birthday yyyy/mm/dd", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Corbino",
			password: "123456",
			email: "jamacea@gmail.com",
			// birthDate: "2001/03/31",
			bio: "Khe kheee toma mangooo",
		});

		expect(status).toBe(400);
		expect(body).toBeDefined();
	});

	test("Incomplete information: bio", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Corbino",
			password: "123456",
			email: "jamacea@gmail.com",
			birthDate: "2001/03/31",
			// bio: "Khe kheee toma mangooo",
		});
		_body2 = {token: body};
		expect(status).toBe(201);
		expect(body).toBeDefined();
	});
});

describe("Generar un JWT de sesión", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
	});

	afterAll(() => {
		mongoose.connection.close();
	});

	test("login with user and password", async () => {
		const {status, body} = await request(app).post("/users/login").send({
			username: "Corbin",
			password: "123456",
		});
		expect(status).toBe(200);
		expect(body).toBeDefined();
	});

	test("Login succesful", async () => {
		const {status, body} = await request(app).post("/users/login").send(_body);
		expect(status).toBe(200);
		expect(body).toEqual({});
	});

	test("User doesn't exist", async () => {
		const {status, body} = await request(app)
			.post("/users/login")
			.send({username: "NoExistoverdad", password: "123456"});
		expect(status).toBe(404);
		expect(body).toEqual({message: "User not found"});
	});

	test("Incorrect password", async () => {
		const {status, body} = await request(app).post("/users/login").send({
			username: "Corbin",
			password: "123457",
		});

		expect(status).toBe(401);
		expect(body).toEqual({message: "Invalid password"});
	});
});
