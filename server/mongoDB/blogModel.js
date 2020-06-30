import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
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
  }
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
