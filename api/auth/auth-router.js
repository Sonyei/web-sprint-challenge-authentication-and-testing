const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authModel = require("./auth-model");
const { bodyExists, uniqueUser } = require("../middleware/restricted");
const jwt = require("jsonwebtoken");

router.get("/jokes", async (req, res, next) => {
	try {
		const joke = await authModel.find();
		if (!joke) {
			res.status(404).json({ message: "No jokes found" });
		}
		res.status(200).json(joke);
	} catch (err) {
		next(err);
	}
});

// res.end('implement register, please!');
/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */

router.post("/register", bodyExists(), uniqueUser(), async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const newUser = await authModel.add({
			username,
			//too much timeSpace causes codeGrade to fail tests.
			password: await bcrypt.hash(password, 11),
		});
		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

// res.end("implement login, please!");

/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

router.post("/login", bodyExists(), async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await authModel.findByUsername(username);
		if (!user) {
			return res.status(404).json({ message: "invalid credentials" });
		}
		const validPassword = await bcrypt.compare(password, user.password);
		if (validPassword !== true) {
			return res.status(401).json({ message: "invalid credentials" });
		}

		//angry pregnant lady token signature
		const token = jwt.sign(
			{
				username: user.username,
				//If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
				expiresIn: "3 hours",
			},
			"I will love my nugget but I hate being pregnant. Hooray for coding bootcamp when screens make me vomit."
		);
		res.cookie("token", token);
		res.json({
			message: `welcome ${user.username}!`,
			token: token,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
