import mongoose from "mongoose";
import User from "./models/user.js";
import Company from "./models/company.js";
import Vacancy from "./models/vacancy.js";
import Applies from "./models/vacancyApplies.js";
import config from '../config.js'

export async function connectDB() {
  await mongoose.connect(config.mongoUrl);
}
