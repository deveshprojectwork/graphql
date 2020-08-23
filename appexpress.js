var express = require('express');
var { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql'); //help to connect the graphql with express

var api = express();

var ourschema = buildSchema(`
    type Query{
        name: String,
        email: String,
        follower: [String]
    }`)

var resolver = {
    name :function(){
        return "devesh"
    },
    email:function(){
        return "deevsh@gmail.com"
    },
    follower:function(){
        return ["devesh", "BB", "CC", "DELHI"]
    }
}

api.use("/data", graphqlHTTP({
    schema:ourschema,
    rootValue:resolver,
    graphiql:true
}))

//https://graphql.org/graphql-js/running-an-express-graphql-server/


api.listen(4000, function(){    //api is the server 
    console.log("server is up and running ")
})


// //INOUT
// {
//     name,
//     email,
//     follower
//  }
// #//OUTPUT
//  {
//     "data": {
//       "name": "devesh",
//       "email": "deevsh@gmail.com",
//       "follower": [
//         "devesh",
//         "BB",
//         "CC",
//         "DELHI"
//       ]
//     }
//   }