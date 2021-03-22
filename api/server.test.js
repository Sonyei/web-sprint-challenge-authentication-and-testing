const server = require("../api/server");
const supertest = require("supertest");

// Write your tests here
test("sanity", () => {
	expect(true).toBe(true);
});

//api/auth/register

describe("POST /register : Able to register new users", () => {
	test("Register a new user", async () => {
		const res = await supertest(server).post("/api/auth/register").send({
			username: "angryPregnantLady",
			password: "Please_pass_so_I_can_lay_down",
		});
		expect(res.statusCode).toBe(201);
	});
	test("", async () => {});
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

//api/auth/users

describe("GET /jokes: Able to hit protected endpoint", () => {
	test("return list of users", async () => {});
	test("return list of users", async () => {});
});
