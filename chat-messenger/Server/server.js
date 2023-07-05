const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//TODO add middleware for the utils 
const { authMiddleware } = require('./utils/auth');
//TODO require your typeDefs, and resolvers from the schemas file
const { typeDefs, resolvers } = require('./Schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//Create an instance of the graphql schema 
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server is running on port ${PORT}!`);
            console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);