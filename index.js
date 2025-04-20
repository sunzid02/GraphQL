import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


//types
import { typeDefs } from "./schema.js";
import db from "./_db.js";


const resolvers = {
    Query: {
        games(){
            return db.games
        },
        reviews(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        review(_, args ){
            return db.reviews.find((review) => review.id === args.id)
        },
        game(_, args ){
            return db.games.find((game) => game.id === args.id)
        },
        author(_, args ){
            return db.authors.find((author) => author.id === args.id)
        }
    },
    
    Game: {
        reviews(parent){
            return db.reviews.filter((rvw) => rvw.game_id === parent.id)
        }
    },
        
    Author: {
        reviews(parent){
            return db.reviews.filter((rvw) => rvw.author_id === parent.id)
        }
    },

    Review: {
        author(parent){
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent){
            return db.games.find((g) => g.id === parent.game_id)
        }
    },

    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter((g) =>  g.id !== args.id )
  
            return db.games
        },

        addGame(_, args){
            let game = {
                ...args.game, 
                id: Math.floor(Math.random() * 10000)
            }

            db.games.push(game)

            return game
        }

        
    }

}


//server setup
const server = new ApolloServer({
    //typeDefs
    typeDefs,
    resolvers
    //resolvers

});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log('Server ready at port', 4000);
