import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true,
    default: ""
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: 'Tag'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: {
    type: String,
    required: true
  }
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);;

