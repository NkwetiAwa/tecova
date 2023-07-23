const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');


require('dotenv').config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4200;

app.use(cors());
app.use(express.json());
/* Connect To MongoDB now */
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB connection established successfully");
    })


//Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "TECOVA..." });
})

// Map files
    const authenticate = require('./routes/authentication');
    const stations = require('./routes/stations');
    const users = require('./routes/users');

    app.use('/authenticate', authenticate);
    app.use('/stations', stations);
    app.use('/users', users);
//

/// app.listen
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
