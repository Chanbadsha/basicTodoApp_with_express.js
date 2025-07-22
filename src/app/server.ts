
import app from "./app"
import { client } from "./config/mongodb";

const port = 5000
let server;

const bootstrap = async () => {
  await client.connect()
  console.log('Connected to mongodb ')
  server = app.listen(port, () => {
    console.log(`The Server is running on port ${port}`)
  })
}

bootstrap()