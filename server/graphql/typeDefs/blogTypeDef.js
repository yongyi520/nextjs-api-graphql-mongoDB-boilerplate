import { gql } from 'apollo-server-micro'

export default gql`
  extend type Query {
    allBlogs: [Blog]
    blog(id: String!): Blog
    blogBySlug(slug: String!): Blog
  }
  extend type Mutation {
    newBlog(input: BlogInput!): Blog
    updateBlog(input: BlogInput!): Blog
    deleteBlog(id: String!): Boolean 
  }
  type Blog {
    id: ID
    slug: String
    userId: String!
    title: String!
    mainImage: String
    description: String!
    content: String!
    tags: [Tag]
  }
  input BlogInput {
    id: ID
    slug: String
    userId: String
    title: String
    mainImage: String
    description: String
    content: String
    tags: [TagInput] 
  }
`