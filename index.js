const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
// Oe7okArjjreUnwn6
// Doctors-portal
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Doctors-portal:Oe7okArjjreUnwn6@cluster0.qtpo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("Doctors-portal");
    const serviceCollection = database.collection("services");
    const appointmentCollection = database.collection("appointments");
    const usersCollection = database.collection("users");
    app.get("/service", async (req, res) => {
      const cursor = serviceCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    // insert one
    app.post("/appointments", async (req, res) => {
      const appointments = req.body;
      console.log(appointments);
      const result = await appointmentCollection.insertOne(appointments);
      console.log(result);
      res.json(result);
    });
    // get the appointments
    app.get("/appointments", async (req, res) => {
      const email = req.query.email;
      const date = new Date(req.query.date).toLocaleDateString();
      const query = { email: email, date: date };
      const cursor = appointmentCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    // save user into database 73-----2
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });
    app.put("/users/admin", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = { $set: { role: 'admin' } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });
    // user admin ki admin na sita check korbo email diye
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      console.log(user);
      let isAdmin = false;
      if (user.role === 'admin') {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("connect to db");
});

app.listen(port, () => {
  console.log("listening from port", port);
});
