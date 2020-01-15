const express=require("express")
const expressGraphQL=require("express-graphql")
const graphqlHTTP=require("express-graphql")
const schema=require("./schema")

const app=express();

app.use('/graphql',expressGraphQL({

    schema:schema,
    graphiql:true,
    
}) )

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>console.log("Running on port: "+PORT))



