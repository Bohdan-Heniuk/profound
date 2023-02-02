import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: "string", default: "" },
  description: { type: String, default: "" },
  avatar: { type: String, default: "/avatars/defaultCompany.png" },
  siteLink: { type: String, default: "" },
  douLink: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Company", companySchema);
