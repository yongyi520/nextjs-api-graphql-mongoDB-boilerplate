import { gql } from 'apollo-server-micro'

export default gql`
  extend type Query {
    allBlogs: [Blog]
  }
  extend type Mutation {
    newBlog(input: BlogInput!): Blog
    updateBlog(input: BlogInput!): Blog
    deleteBlog(id: String!): Boolean 
  }
  type Blog {
    id: ID!
    userId: String!
    title: String!
    description: String!
    content: String!
    tags: [Tag]
  }
  input BlogInput {
    id: ID!
    userId: String!
    title: String!
    description: String!
    content: String!
    tags: [TagInput] 
  }
`