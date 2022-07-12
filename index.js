const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

//username and password
//notesTraker
//SZW3P9PLhG2kwC1G
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://notesTraker:SZW3P9PLhG2kwC1G@cluster0.4ekkx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const notesCollection = client.db("notesTraker").collection("notes");

        //get api to read all notes
        //localhost:5000/notes
        app.get('/notes', async (req, res) => {
            const q = req.query;
            console.log(q);

            const cursor = notesCollection.find({});
            const result = await cursor.toArray();

            res.send(result);
        })


        //create notes taker
        //localhost:5000/note
        /**
         * body{
            "userName":"oshan",
            "textData":"Hello world 2"
            }
         */
        app.post('/note', async (req, res) => {
            const data = req.body;

            const result = await notesCollection.insertOne(data);

            console.log(data);
            res.send(result);

        })

        // update notestaker
        app.put('//note/:id', (req, res) =>{
            const id = req.params.id;
            console.log(id);
        })


        //delete notes taker
        console.log("Connected to the Db");
    }
    finally {

    }
}
run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('connect to db');
//   // perform actions on the collection object
//   //client.close();

// });



app.get('/', (req, res) => {
    res.send('Hello world');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})