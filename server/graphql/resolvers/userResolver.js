import dbConnect from "../../utils/dbConnect";
import { User } from "../../mongoDB/userModel";
import omit from "lodash/omit";

export default {
  Query: {
    allUsers: async (parentValue, args, context, info) => {
      await dbConnect();
      const users = await User.find()
      console.log('users', users)
    },
  },
  Mutation: {
    newUser: async (parentValue, { input }, context, info) => {
      await dbConnect();
      const response = await User.create(input);
      console.log("add user response", response);
    },
    updateUser: async (parentValue, { input }, context, info) => {
      await dbConnect();
      const { id } = input;
      const updateUserInput = omit(input, "id")
      const response = await User.updateOne({ _id: id, $set: updateUserInput });
      console.log("update user response", response.n === 1);
    },
    deleteUser: async (parentValue, { id }, context, info) => {
      await dbConnect()
      const deleteResponse = await User.deleteOne({_id: id})
    },
  },
};
