import jwt from "jsonwebtoken";

const authenticateJWT =
  ({ requiredLogin }) =>
  (req, res, next) => {
    const token = req.headers.authorization;

    if (!token && requiredLogin) {
      return res.sendStatus(401);
    }

    if (token) {
      jwt.verify(token, "secret", (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
      });
    }

    next();
  };

export default authenticateJWT;
