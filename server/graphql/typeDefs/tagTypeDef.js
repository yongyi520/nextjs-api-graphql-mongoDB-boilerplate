import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    allTags: [Tag]
  }

  extend type Mutation {
    newTag(input: TagInput!): Tag
    updateTag(input: TagInput!): Tag
    deleteTag(id: String!): Boolean
  }

  type Tag {
    id: ID
    name: String!
  }

  input TagInput {
    id: ID
    name: String! 
  }
`