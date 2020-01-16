const express=require("express")
const expressGraphQL=require("express-graphql")
const schema=require("./schema")
const cors=require('cors')



const app=express();
app.use(cors())

app.use('/graphql',expressGraphQL({

    schema:schema,
    graphiql:true,
    
}) )

const PORT=process.env.PORT || 8000

app.listen(PORT,()=>console.log("Running on port: "+PORT))



