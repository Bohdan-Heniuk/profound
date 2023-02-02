import User from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequest } from "../common/errors.js";
import { Roles } from "../common/enums.js";
import CompanyService from "./company.js";
import Company from "../db/models/company.js";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();
class Auth {
  async registration({ username, email, password, role, avatar }) {
    try {
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw new BadRequest("Користувач з таким email вже існує");
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
        role,
        avatar,
      });

      if (newUser.role === Roles.Recruter) {
        const newCompany = await CompanyService.create({
          creator: newUser._id,
        });

        newUser.companyId = newCompany._id;
      }

      return this.generateToken(newUser);
    } catch (e) {
      console.log("Failed to register", e);
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.validateUser(email, password);
      return this.generateToken(user);
    } catch (e) {
      console.log("Failed to login", e);
      throw e;
    }
  }

  async generateToken(userPayload) {
    try {
      const payload = {
        _id: userPayload._id,
        username: userPayload.username,
        email: userPayload.email,
        role: userPayload.role,
        avatar: userPayload.avatar,
        companyId: userPayload.companyId,
      };

      return jwt.sign(payload, config.jwtSecret);
    } catch (e) {
      console.log("Failed to generate token", e);
      throw e;
    }
  }

  async validateUser(email, password) {
    try {
      const user = await User.findOne({ email }).lean();

      if (!user) {
        throw new BadRequest("Некоректний email або пароль");
      }

      const passwordEquals = await bcrypt.compare(password, user.password);

      if (!passwordEquals) {
        throw new BadRequest("Некоректний email або пароль");
      }

      if (user.role === Roles.Recruter) {
        user.companyId = (await Company.findOne({ creator: user._id }))._id;
      }

      return user;
    } catch (e) {
      console.log("Failed to validate user", e);
      throw e;
    }
  }
}

export default new Auth();
