const express = require('express');
const GraphQLHTTP = require('express-graphql');
const cors = require('cors');
const mySchema = require('./schema');

const server = express();
const PORT = 5000 || process.env.PORT;

// Allow Cross-Origin
server.use(cors());

server.use(
  '/graphql',
  GraphQLHTTP({
    schema: mySchema,
    graphiql: true
  })
);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
