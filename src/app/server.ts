import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app"
const port = 5000
let server;

// Connect to mongodb server 
const uri = "mongodb+srv://nextLevelUser:nextLevelUser@cluster0.t47d6.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





const bootstrap = async () => {
    await client.connect()
    console.log('Connected to mongodb ')



    server = app.listen(port, () => {
        console.log(`The Server is running on port ${port}`)
    })
}

bootstrap()