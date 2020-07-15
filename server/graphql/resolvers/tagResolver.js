import omit from 'lodash/omit'

import { Tag } from "../../mongoDB/tagModel";
import dbConnect from "../../utils/dbConnect";

export default {
  Query: {
    allTags: async (parentValue, args, context, info) => { 
      await dbConnect();
      const tags = await Tag.find()
      console.log('tags', tags)
    }
  },
  Mutation: {
    newTag: async (parentValue, {input}, context, info) => { 
      await dbConnect();
      const response = await Tag.create(input);
      console.log("add Tag response", response);
    },
    updateTag: async (parentValue, {input}, context, info) => { 
      await dbConnect();
      const { id } = input;
      const updateTagInput = omit(input, "id")
      const response = await Tag.updateOne({ _id: id, $set: updateTagInput });
      console.log("update tag response", response.n === 1);
    },
    deleteTag: async (parentValue, {id}, context, info) => { 
      await dbConnect()
      const deleteResponse = await Tag.deleteOne({_id: id})
    }
  }
}