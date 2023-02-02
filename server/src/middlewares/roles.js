import jwt from "jsonwebtoken";
import config from '../config.js'

const RoleGuard = (roles) => (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (!roles.includes(user.role)) {
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default RoleGuard;
