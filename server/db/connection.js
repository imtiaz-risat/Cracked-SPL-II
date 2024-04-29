// mongodb connection
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://xtradrill:4RLHMAqthf6aofjt@cracked.eqwqxyn.mongodb.net/?retryWrites=true&w=majority&appName=CrackEd";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();

  await client.db("CrackEd").command({ ping: 1 });

  console.log("pinged your depo. Connected to MongoBD!!");
} catch (err) {
  console.log(err);
}

// Use Database name
let db = client.db("CrackEd");

export default db;
