

const express = require("express")
const expressGraphQl = require("express-graphql")
const app = express()

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require("graphql")

const BookType =  new GraphQLObjectType({
    name: "Book",
    description: "This represnet the books written by the author",
    fields:() =>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author:{
            type: AuthorType, 
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})



const AuthorType =  new GraphQLObjectType({
    name: "Author",
    description: "This represnet the books author",
    fields:() =>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: "query",
    description: "Root Query",
    fields: () =>({
        books: {
            type: new GraphQLList(BookType),
            description: "List of all the books",
            resolve: () => books

        }
    })
})


const myschema = new GraphQLSchema({
    query: RootQueryType
  })

  
app.use('/graphql',expressGraphQl({
    schema: myschema,
    graphiql: true,

}))

app.listen(5000, ()=>{
    console.log("port connected to lession 2")
})

// Part 1:
//tells about the getting the books detials 
// {
//     books {
//       id,
//       name,
//       authorId
//     } 
//   }

// Part 2:
// {
//     books {
//       id,
//       name,
//       author{
//         id,
//         name
//       }
//     } 
//   }
