const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
    } = require('graphql');
const axios = require('axios');

// This is an example of working with 3'rd party api. In this case it is the Space X API 
// the key's on the field then need to match what is in the json on the api. i.e flight_number etc.
// flight_number: {type: GraphQLInt} >>> We use GraphQLInt because an intereger(number) is returned from the json.

// Space X Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType}
    })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
})

// Parkering
const Parkering = new GraphQLObjectType ({
    name: 'Parkering',
    fields: () => ({
        id: {type: GraphQLInt},
        parkeringstilbyderNavn: {type: GraphQLString},
        aktivVersjon: {type: ParkeringInfo}
    })
})

// Parkering Info
const ParkeringInfo = new GraphQLObjectType ({
    name: 'ParkeringInfo',
    fields: () => ({
        navn: {type: GraphQLString},
        adresse: {type: GraphQLString}
    })
})


// RootQuery 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => {
                        return res.data
                    })
            }
        },
        parkering: {
            type: new GraphQLList(Parkering),
            resolve(parent, args) {
                return axios.get('https://www.vegvesen.no/ws/no/vegvesen/veg/parkeringsomraade/parkeringsregisteret/v1/parkeringsomraade?datafelter=alle')
                    .then(res => {
                        return res.data
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});