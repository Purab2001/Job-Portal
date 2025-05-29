const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vxzre11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("job-portal");
    const collection = db.collection("jobs");
    const applications = db.collection("applications");

    app.get("/jobs", async (req, res) => {
      const email = req.query.email;
      const query = {}
      if (email) {
        query.hr_email = email;
      }
      const cursor = collection.find(query);
      const jobs = await cursor.toArray();
      res.send(jobs);
    });

    // app.get('/jobsByHR', async (req, res) => {
    //   const email = req.query.email;
    //   const query = { hr_email: email };
    //   const result = await collection.find(query).toArray();
    //   res.send(result);
    // });

    app.get("/jobs/:id", async (req, res) => {
      const jobId = req.params.id;
      const cursor = collection.find({ _id: new ObjectId(jobId) });
      const job = await cursor.toArray();
      res.send(job);
    });

    app.post("/jobs", async (req, res) => {
      const newJob = req.body;
      const result = await collection.insertOne(newJob);
      res.send(result);
    });

    app.post("/apply", async (req, res) => {
      const application = req.body;
      const result = await applications.insertOne(application);
      res.send(result);
    });

    app.get("/applications/job/:job_id", async (req, res) => {
      const job_id = req.params.job_id;
      const query = { jobId: job_id };
      const result = await applications.find(query).toArray();
      res.send(result);
    });

    app.get("/applications", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await applications.find(query).toArray();
      res.send(result);
    });

    app.patch("/applications/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(req.params.id) };
      const updatedDoc = {
        $set: {
          status: req.body.status,
        }
      }
      const result = await applications.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job Portal");
});

app.listen(port, () => {
  console.log(`Job Portal is running on port ${port}`);
});
