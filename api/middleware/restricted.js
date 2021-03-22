const jwt = require("jsonwebtoken");
const authModel = require("../auth/auth-model");

/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

const restricted = () => async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({ message: "token required" });
		}

		jwt.verify(
			token,
			"I will love my nugget but I hate being pregnant. Hooray for coding bootcamp when screens make me vomit.",
			(err, checkToken) => {
				if (err) {
					return res.status(401).json({ message: "token invalid" });
				}
				req.token = checkToken;
			}
		);
		next();
	} catch (err) {
		next(err);
	}
};
// if (!user || !password) {
// 	return res.status(401).json({
// 		message: "username and password required",
// 	});
// } else if (user) {
// 	return res.status(409).json({
// 		message: "username taken",
// 	});

const bodyExists = () => async (req, res, next) => {
	try {
		if (!req.body.username || !req.body.password) {
			return res
				.status(401)
				.json({ message: "username and password required" });
		}
		next();
	} catch (err) {
		next(err);
	}
};

const uniqueUser = () => async (req, res, next) => {
	try {
		const username = await authModel.findByUsername(req.body.username);

		if (username) {
			return res.status(409).json({ message: "username taken" });
		}
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	restricted,
	bodyExists,
	uniqueUser,
};
