import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);;
