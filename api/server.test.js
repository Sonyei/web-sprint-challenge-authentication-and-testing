const server = require("../api/server");
const supertest = require("supertest");

// Write your tests here
test("sanity", () => {
	expect(true).toBe(true);
});

//api/auth/register

describe("POST /register : Able to register new users", () => {
	test("Register a new user and respond with 201 status code", async () => {
		const res = await supertest(server).post("/api/auth/register").send({
			username: "angryPregnantLady",
			password: "Please_pass_so_I_can_lay_down",
		});
		expect(res.statusCode).toBe(201);
	});
	test("Registering a duplicate username responds with 409 status code. 2 pregnant ladies is too much.", async () => {
		const res = await supertest(server).post("/api/auth/register").send({
			username: "angryPregnantLady",
			password: "So_dizzy",
		});
		expect(res.statusCode).toBe(409);
	});
});

//api/auth/login

describe("POST /login: Able to login and authenticate user with token", () => {
	test("respons with 200 status code upon successful login", async () => {
		const res = await supertest(server).post("/api/auth/login").send({
			username: "angryPregnantLady",
			password: "Please_pass_so_I_can_lay_down",
		});
		expect(res.statusCode).toBe(200);
	});
	test("responds with 404 status code if login credentials are incorrect", async () => {
		const res = await supertest(server).post("/api/auth/login").send({
			username: "perfectlyHappyPregnantLady",
			password: "Lies",
		});
		expect(res.statusCode).toBe(404);
	});
});

//api/jokes

describe("GET /jokes: Able to hit protected endpoint", () => {
	test("responds with joke data with valid token", async () => {});
	test("denies data with invalid token", async () => {});
});
