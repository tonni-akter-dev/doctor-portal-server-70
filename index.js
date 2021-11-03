const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
// Oe7okArjjreUnwn6
// Doctors-portal
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Doctors-portal:Oe7okArjjreUnwn6@cluster0.qtpo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("Doctors-portal");
      const serviceCollection = database.collection("services");
  

app.get('/service',async(req,res)=>{
    const cursor = serviceCollection.find({});
    const result=await cursor.toArray();
    res.send(result)
})

 
     
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('connect to db')
});

app.listen(port, () => {
    console.log('listening from port', port);
})