import mongoose from "mongoose";

const vacancySchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    salaryRange: {
      min: Number,
      max: Number,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    specialty: { type: String, required: true },
    experience: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Vacancy", vacancySchema);
