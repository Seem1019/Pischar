/* eslint-disable no-undef */
import mongoose from "mongoose";
import request from "supertest";
import {Testapp} from "../src/appAndtest.modules";
import jwt from "jsonwebtoken";

// import {MongoMemoryServer} from "mongodb-memory-server";
// const {MongoClient} = require("mongodb");

// ------------------------------------------
let user1;
let user_id_1;
let post_user_1_1;
let post_user_1_2;
// ------------------------
let user2;
let user_id_2;
let user3;
let user_id_3;

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

		user1 = body;
		user_id_1 = {user_id: jwt.verify(user1.token, "secret").user_id};
		expect(body).toBeDefined();
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
		user2 = body;
		user_id_2 = {user_id: jwt.verify(user2.token, "secret").user_id};
		expect(status).toBe(201);
		expect(body).toBeDefined();
	});

	test("Getting another user for future", async () => {
		const {status, body} = await request(app).post("/users/").send({
			username: "Sergio",
			password: "123456",
			email: "Sergio@uninorte.edu.co",
			birthDate: "1998/09/01",
			bio: "Khe kheee toma aguacate",
		});

		user3 = body;
		user_id_3 = {user_id: jwt.verify(user3.token, "secret").user_id};
		expect(body).toBeDefined();
		expect(status).toBe(201);
	});
});

describe("Login", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
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
		const {status, body} = await request(app).post("/users/login").send(user1);
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

describe("Posts", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
	});

	test("creating 3 publications by user 1, also creating 1 publication by user 2 and 3", async () => {
		// ------------------Creando 3 publicaciones para usuario 1
		{
			const img_url =
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3c-RW0MF_lm5YsTO_SszuWEdkLPxuI7EKjSOcZnzowgGxEnaPhHrRb18kT6x5mAOVeqA&usqp=CAU";
			const bio = "Hola este es un lindo gatito";
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user1.token)
				.send({img_url, bio, author: user_id_1.user_id});

			expect(status).toBe(201);
			expect(body).toBeDefined();
		}

		{
			const img_url =
				"https://i.pinimg.com/736x/9c/5d/3a/9c5d3a8caa045e8db8cb3263539a966b.jpg";
			const bio = "Hola este es otro lindo gatito";
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user1.token)
				.send({img_url, bio, author: user_id_1.user_id});

			expect(status).toBe(201);
			expect(body).toBeDefined();
		}

		{
			const img_url =
				"https://i.pinimg.com/564x/79/28/ed/7928ede53423e03dc81646b4528c0242.jpg";
			const bio = "Hola este es un lindo perrito";
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user1.token)
				.send({img_url, bio, author: user_id_1.user_id});

			expect(status).toBe(201);
			expect(body).toBeDefined();
		}

		// -----------Creando una publicacion usuario 2
		{
			const img_url =
				"https://s2.best-wallpaper.net/wallpaper/2880x1800/1909/Cute-puppy-box_2880x1800.jpg";
			const bio = "Perro";
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user2.token)
				.send({img_url, bio, author: user_id_2.user_id});

			expect(status).toBe(201);
			expect(body).toBeDefined();
		}
		// -----------Creando una publicacion usuario 3
		{
			const img_url =
				"https://w0.peakpx.com/wallpaper/453/1015/HD-wallpaper-puppy-cute-rachael-hale-caine-paw-white-dog-animal.jpg";
			const bio = "wauu";
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user3.token)
				.send({img_url, bio, author: user_id_3.user_id});

			expect(status).toBe(201);
			expect(body).toBeDefined();
		}
	});

	test("Giving like", async () => {
		// getting post_id
		{
			const {status, body} = await request(app)
				.get("/posts/")
				.set("token", user1.token)
				.query({author: user_id_1.user_id});

			expect(status).toBe(200);
			expect(body).toBeDefined();
			post_user_1_1 = body[0]._id;
			post_user_1_2 = body[1]._id;
		}
		// user 2 giving like to post by user 1
		// 1 like
		{
			const {status} = await request(app)
				.post("/posts/like")
				.set("token", user2.token)
				.send({post_id: post_user_1_1});
			expect(status).toBe(200);
		}
	});

	test("waiting for posts liked by user 2 to be 2 ", async () => {
		{
			const {status, body} = await request(app)
				.post("/posts/like")
				.set("token", user2.token)
				.send({post_id: post_user_1_2});
			expect(body).toEqual({});
			expect(status).toBe(200);
		}

		{
			const {status, body} = await request(app)
				.get("/posts/liked-by")
				.set("token", user2.token)
				.query(user_id_2);
			expect(body.length).toBe(2);
			expect(status).toBe(200);
		}
	});

	// Two posts saved by user 2
	test("Save posts", async () => {
		{
			const {status, body} = await request(app)
				.post("/posts/save")
				.set("token", user2.token)
				.send({post_id: post_user_1_1});

			expect(status).toBe(200);
			expect(body).toEqual({});
		}

		{
			const {status, body} = await request(app)
				.post("/posts/save")
				.set("token", user2.token)
				.send({post_id: post_user_1_2});

			expect(status).toBe(200);
			expect(body).toEqual({});
		}
	});

	test("Number of saved posts: Expected number (2)", async () => {
		{
			const {status, body} = await request(app)
				.get("/posts/saved-by")
				.set("token", user2.token)
				.query({});

			expect(status).toBe(200);
			expect(body.length).toBe(2);
		}
	});

	test("commenting a publication", async () => {
		// Adding two comments
		{
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user2.token)
				.send({post_id: post_user_1_1, comment: "Que bonito"});

			expect(status).toBe(200);
			expect(body).toEqual({});
		}

		{
			const {status, body} = await request(app)
				.post("/posts/")
				.set("token", user3.token)
				.send({post_id: post_user_1_1, comment: "Si, esta muy bonito"});

			expect(status).toBe(200);
			expect(body).toEqual({});
		}
	});

	test("getting comments from a publications: expected 2 comments", async () => {
		const {status, body} = await request(app)
			.get("/posts/")
			.set("token", user1.token)
			.send({post_id: post_user_1_1});

		expect(status).toBe(200);
		expect(body.comments.length).toBe(2);
	});
});

describe("followers", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
	});

	test("user 2 asks to follow user 1", async () => {
		const {status, body} = await request(app)
			.post("/follows/request")
			.set("token", user2.token)
			.send(user_id_1);
		expect(status).toBe(201);
		expect(body).toEqual({});
	});
	// ----------- Working
	test("User 1 accepts user's 2 follow request ", async () => {
		let request_id;
		{
			const {body} = await request(app)
				.get("/follows/follow-requests")
				.set("token", user1.token);
			expect(body).toBeDefined();

			request_id = body[0]._id;
		}

		{
			const {status, body} = await request(app)
				.post("/follows/response")
				.set("token", user1.token)
				.send({request_id, action: "accept"});

			expect(status).toBe(200);
			expect(body).toBeDefined();
		}
	});

	test("Accepting again request from user 2 to user 1 : not able to send it again ", async () => {
		{
			const {status, body} = await request(app)
				.post("/follows/request")
				.set("token", user2.token)
				.send(user_id_1);
			expect(status).toBe(400);
			expect(body).toEqual({message: "Request already exists."});
		}
	});

	test("Rejecting request: 2 to 1", async () => {
		{
			const {status, body} = await request(app)
				.post("/follows/request")
				.set("token", user1.token)
				.send(user_id_2);
			expect(status).toBe(201);
			expect(body).toEqual({});
		}
		let request_id;
		{
			const {body} = await request(app)
				.get("/follows/follow-requests")
				.set("token", user2.token);

			expect(body).toBeDefined();
			request_id = body[0]._id;
		}

		{
			const {status, body} = await request(app)
				.post("/follows/response")
				.set("token", user2.token)
				.send({request_id, action: "reject"});

			expect(status).toBe(200);
			expect(body).toBeDefined();
		}
	});

	test("rejecting a rejected request: once rejected deleted request", async () => {
		{
			const {body} = await request(app)
				.get("/follows/follow-requests")
				.set("token", user2.token);

			expect(body).toBeDefined();
			expect(body[0]).toBeUndefined();
		}
	});

	// Algo bien extraño sucede en conseguir la follow list
	test("followers list: user 2: expected 1", async () => {
		// User 3 follows user 2

		{
			{
				const {status, body} = await request(app)
					.post("/follows/request")
					.set("token", user3.token)
					.send(user_id_2);

				expect(status).toBe(201);
				expect(body).toEqual({});
			}

			{
				let request_id;
				{
					const {body} = await request(app)
						.get("/follows/follow-requests")
						.set("token", user2.token);
					expect(body).toBeDefined();

					request_id = body[0]._id;
				}

				{
					const {status, body} = await request(app)
						.post("/follows/response")
						.set("token", user2.token)
						.send({request_id, action: "accept"});

					expect(status).toBe(200);
					expect(body).toEqual({});
				}
			}
		}

		{
			const {status, body} = await request(app)
				.get("/follows/followers")
				.set("token", user3.token)
				.query(user_id_2);

			expect(status).toBe(200);
			expect(body).toHaveLength(1);
		}
	});

	test("Following list by user 3 : expected 1", async () => {
		{
			const {status, body} = await request(app)
				.post("/follows/request")
				.set("token", user2.token)
				.send(user_id_3);

			expect(status).toBe(201);
			expect(body).toEqual({});
		}

		let request_id;
		{
			const {body} = await request(app)
				.get("/follows/follow-requests")
				.set("token", user3.token);
			expect(body).toBeDefined();

			request_id = body[0]._id;
		}

		{
			const {status, body} = await request(app)
				.post("/follows/response")
				.set("token", user3.token)
				.send({request_id, action: "accept"});

			expect(status).toBe(200);
			expect(body).toEqual({});
		}

		{
			const {status, body} = await request(app)
				.get("/follows/following")
				.set("token", user2.token)
				.query(user_id_3);

			expect(status).toBe(200);
			expect(body).toHaveLength(1);
		}
	});
});

// describe("");

describe("User's information", () => {
	let app;
	beforeAll(() => {
		app = Testapp();
	});

	test("No birthDate And password information", async () => {
		let {body} = await request(app)
			.get("/users/")
			.set("token", user1.token)
			.query(user_id_1);
		expect(body).toBeDefined();
		expect(body.error).toBeUndefined();
		expect(body.password).toBeUndefined();
		expect(body.birthDate).toBeUndefined();
	});

	test("Expecting 3 publications by user 1", async () => {
		const {status, body} = await request(app)
			.get("/users/")
			.set("token", user1.token)
			.query(user_id_1);

		expect(status).toBe(200);
		expect(body.posts_count).toBe(3);
	});

	test("liked publications by user 2: expected 2", async () => {
		const {status, body} = await request(app)
			.get("/users/")
			.set("token", user2.token)
			.query(user_id_2);

		expect(status).toBe(200);
		expect(body.likes_count).toBe(2);
	});
});

describe("Finished correctly ", () => {
	beforeAll(async () => {
		await mongoose.connection.close();
	});

	test("mongoDB closed ", async () => {
		expect(mongoose.connection.readyState).toBe(0);
	});
});
