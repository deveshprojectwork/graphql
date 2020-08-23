//creatin basic GRAPHQL with Hello world    
const express = require("express")
const expressGraphQl = require("express-graphql")
const app = express()

const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql")

const myschema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HelloWorld",
        fields: () =>({
            message : {
                type: GraphQLString,
                resolve: () => "Hello World"
            }
        })
    })
})

app.use('/graphql',expressGraphQl({
    schema: myschema,
    graphiql: true,

}))

app.listen(5000, ()=>{
    console.log("port connected")
})

//http://localhost:5000/graphql
// Part 1:
//tells about the getting the messae 
// {
//    message
// }