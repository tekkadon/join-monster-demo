import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import Post from './Post'
import User from './User'

export default new GraphQLObjectType({
  description: 'Comments on posts',
  name: 'Comment',
  // another SQL table to map to
  sqlTable: 'comments',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      // assumed SQL column to be "id"
      type: GraphQLInt
    },
    body: {
      description: 'The content of the comment',
      // assumed to be "body"
      type: GraphQLString
    },
    post: {
      description: 'The post that the comment belongs to',
      // a back reference to its Post
      type: Post,
      // how to join these tables
      sqlJoin: (commentTable, postTable) => `${commentTable}.post_id = ${postTable}.id`
    },
    author: {
      description: 'The user who wrote the comment',
      // and one to its User
      type: User,
      sqlJoin: (commentTable, userTable) => `${commentTable}.author_id = ${userTable}.id`
    }
  })
})
