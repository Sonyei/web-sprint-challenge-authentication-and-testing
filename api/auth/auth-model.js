const db = require("../../data/dbConfig");

const add = async (user) => {
	const newUser = await db("users").insert(user);
	return findById(newUser);
};

const find = async () => {
	const userList = await db("users").select("*");
	return userList;
};

const findById = async (id) => {
	const userId = await db("users")
		.select("users.id", "users.username", "users.password")
		.where("users.id", id)
		.first();
	return userId;
};

const findByUsername = async (filter) => {
	const userName = await db("users")
		.select("users.id", "users.username", "users.password")
		.where("users.username", filter)
		.first();
	return userName;
};

module.exports = {
	add,
	find,
	findById,
	findByUsername,
};
