const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://heryoyo1989:3325NovaTrail@cluster0.009g8ak.mongodb.net/?retryWrites=true&w=majority";


const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      const database = client.db("Soccer");
      const stars = database.collection("Stars");
      // Query for a movie that has the title 'The Room'
      const query = { name: "Messi" };
      const options = {
        // sort matched documents in descending order by rating
        sort: { "imdb.rating": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, title: 1, imdb: 1 },
      };
      const star = await stars.findOne(query);
      // since this method returns the matched document, not a cursor, print it directly
      console.log(star);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);


app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get('/api', async(req, res) => {
    console.log('hello')
    await client.connect();
    const database = client.db("Soccer");
      const stars = database.collection("Stars");
      // Query for a movie that has the title 'The Room'
      const query = { name: "Messi" };
      const options = {
        // sort matched documents in descending order by rating
        sort: { "imdb.rating": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, title: 1, imdb: 1 },
      };
      const star = await stars.findOne(query);

    res.json({ name: star.name, id: 'ok'});
    // res.sendFile('dist/index.html', {root: __dirname})
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});






