import mongoose from "mongoose";

const vacancyViews = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("vacancyViews", vacancyViews);
