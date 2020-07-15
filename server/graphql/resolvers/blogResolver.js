import omit from "lodash/omit";

import dbConnect from "../../utils/dbConnect";
import { Blog } from "../../mongoDB/blogModel";

export default {
  Query: {
    allBlogs: async (parentValue, args, context, info) => {
      await dbConnect();
      const blogs = await Blog.find();
      console.log("blogs", blogs);
      return blogs;
    },
    blog: async (parentValue, { id }, context, info) => {
      await dbConnect();
      const blog = await Blog.findOne({ _id: id });
      return blog;
    },
    blogBySlug: async (parentValue, { slug }, context, info) => {
      await dbConnect();
      const blog = await Blog.findOne({ slug: slug });
      return blog;
    }
  },
  Mutation: {
    newBlog: async (parentValue, { input }, context, info) => {
      await dbConnect();
      const response = await Blog.create(input);
      console.log("add Blog response", response);
      return response;
    },
    updateBlog: async (parentValue, { input }, context, info) => {
      await dbConnect();
      const { id } = input;
      const updateBlogInput = omit(input, "id");
      console.log('update blog input', updateBlogInput)
      const response = await Blog.updateOne({ _id: id}, {$set: updateBlogInput });
      console.log("update Blog response", response.n === 1);
      return await Blog.findOne({ _id: id });
    },
    deleteBlog: async (parentValue, { id }, context, info) => {
      await dbConnect();
      const deleteResponse = await Blog.deleteOne({ _id: id });
      console.log("delete blog response", deleteResponse.n === 1);
      return deleteResponse.n === 1;
    },
  },
};
