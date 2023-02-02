import mongoose from "mongoose";
import { Roles } from "../../common/enums.js";

const userSchema = new mongoose.Schema({
  email: { type: "string", required: true },
  username: { type: "string", required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "avatars/defaultUser.png" },
  role: {
    type: String,
    required: true,
    enum: [Roles.Candidate, Roles.Recruter],
  },
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
