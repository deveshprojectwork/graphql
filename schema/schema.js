const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,
       GraphQLString,
       GraphQLInt,
       GraphQLList,
       GraphQLSchema} = graphql

const users = [
    {"id": "23", "firstName":"Bill", "age":20},
    {"id": "47", "firstName":"John", "age":22},
    {"id": "13", "firstName":"Andy", "age":11},
    {"id": "76", "firstName":"Kerio", "age":33}
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:{
        id:{type: GraphQLString},
        firstName:{type: GraphQLString},
        age:{type: GraphQLInt}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        user:{
            type: UserType,
            args:{id:{type:GraphQLString}},
            resolve: (parent, args) => users.find(user => user.id === args.id)
        },
        users: {
            type: new GraphQLList(UserType),
            description: "List of all the users",
            resolve: () => users
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})