

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
    GraphQLNonNull,
    isOutputType
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
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
              return books.filter(book => book.authorId === author.id)
            }
        }
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
        },
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
              id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
              id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
          }

    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addBook: {
        type: BookType,
        description: 'Add a book',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          authorId: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
          const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
          books.push(book)
          return book
        }
      },
      addAuthor: {
        type: AuthorType,
        description: 'Add an author',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
          const author = { id: authors.length + 1, name: args.name }
          authors.push(author)
          return author
        }
      }
    })
  })

const myschema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

  
app.use('/graphql',expressGraphQl({
    schema: myschema,
    graphiql: true,

}))

app.listen(5000, ()=>{
    console.log("port connected to lession 3")
})


// Part 1:
//tells about the getting the books detials 
// {
//     authors {
//       id,
//      name
//    },
//    books {
//      id,name,author {
//        id
//      }
//    }
// }

// single query for book with id :
// {
// 	book(id:3)   {
//     name
//   }
// }

// single author
// {
// 	author(id:3) {
// 	  id,
//     name,
// 	}
// }

// mutation{
//     addBook(authorId:1, name:"Dr. Deep Mike"){
//       name,
//       id
//     }
//   }

// Output  //new row have been added 
// {
//     "data": {
//       "addBook": {
//         "name": "Dr. Deep Mike",
//         "id": 9
//       }
//     }
// }

// {
//     books {
//       id,
//       name
//     }
//   }

// output
// {
//     "id": 9,
//     "name": "Dr. Deep Mike"
// }

// +++++++++++++++++++

// mutation{
//     addAuthor(name: "devesh") {
//       id,
//       name
//     }
//   }

// added author
// {
//     "data": {
//       "addAuthor": {
//         "id": 5,
//         "name": "devesh"
//       }
//     }
//   }
//output
// {
//     authors {
//       id,
//       name
//     }
// }