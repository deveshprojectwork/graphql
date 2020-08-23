var {gql, ApolloServer} = require("apollo-server");

var port = 4000;

var books = [
    {  
        id:1,
        name: "Book1",
        price:100,
        author:[{id:"Author1"}]
        },
    {  
        id:2,
        name: "Book1",
        price:100,
        author:[{id:"Author1"}]
    },
    {  id:3,
        name: "Book1",
        price:100,
        author:[{id:"Author1"}]},
    {  id:4,
        name: "Book1",
        price:100,
        author:[{id:"Author1"}]}
]

var Author =[
    {
        id:"Aut1",
        name:"Devesh",
        books:[{id:2}]
    },
    {
        id:"Aut2",
        name:"Devesh1",
        books:[{id:5}]
    }
]
  

var schema = gql `
type Query{
    book
    author
}

type Book{
    id: ID,
    name: String,
    price:Int,
    author: Author
}

type Author{
    id: ID,
    name: String,
    book: [Book],
}

type Mutaion{ 
    createBook: String
}
`
//mutation - ehelp to moifiy the date


var authors = [{
    id:ID,
    name:String,
    books:[Book]
}

]

var resolvers = {
    Query:{
        book: function(){
            return books
        },
        author: function(){
            return author
        }
    },
    Mutation:{
        creatbook:function(){
            return "anc";
        }
    }
}


var server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers

})

server.listen(port,function(){
    console.log(`thi post is ${port}`)
})