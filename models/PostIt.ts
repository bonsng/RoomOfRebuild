import mongoose from "mongoose";

export interface PostIts extends mongoose.Document {
  position: number[];
  text: string;
}

const PostItsSchema = new mongoose.Schema<PostIts>(
  {
    position: {
      required: [true, "Please provide position"],
      default: [0, 0],
      type: [Number],
    },
    text: {
      type: String,
      default: "",
      required: [true, "Please provide text."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PostIt ||
  mongoose.model<PostIts>("PostIt", PostItsSchema, "notes");
