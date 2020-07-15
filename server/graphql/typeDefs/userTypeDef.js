import { gql } from "apollo-server-micro";
export default gql`
  extend type Query {
    allUsers: [User]
  }

  extend type Mutation {
    newUser(input: UserInput!): User
    updateUser(input: UserInput!): User
    deleteUser(id: String!): Boolean
  }

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserInput {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String! 
  }
`;
