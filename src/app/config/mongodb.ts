import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://nextLevelUser:nextLevelUser@cluster0.t47d6.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";


export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});