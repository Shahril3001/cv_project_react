const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/mycvsite'

async function connect() { 
    const client = await MongoClient.connect(uri,
        {useNewUrlParser: true, useUnifiedTopology: false});
    console.log('MongoDB connected');
    return client.db();
}

// POST
app.post('/api/addperson', async (req,res) => {
    const db = await connect();
    const { name, age, company} = req.body;
    const result = await db.collection('personalinfo').insertOne({name,age,company});
    console.log(`Document inserted with _id: ${result.insertedID}`);
    res.json(result);
});

app.post('/api/addportfolio', async (req,res) => {
    const db = await connect();
    const { type, year} = req.body;
    const result = await db.collection('portfolioinfo').insertOne({type,year});
    console.log(`Document inserted with _id: ${result.insertedID}`);
    res.json(result);
});

// GET
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/about', (req, res) => {
  res.send('About from Express!');
});

app.get('/api/person', cors(), async (req,res) => {
    const db = await connect();
    const result = await db.collection('personainfo').find().toArray();
    res.send(result);
});

app.get('/api/portfolio', cors(), async (req,res) => {
    const db = await connect();
    const result = await db.collection('portfolioinfo').find().toArray();
    res.send(result);
});

app.listen(port, () => console.log(`Server started on port ${port}`));


