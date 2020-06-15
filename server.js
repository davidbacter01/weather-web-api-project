const projectData = {};
projectData.data = [];
const express = require("express");
//start an instance of the app
const app = express();
//setting the port
const port = 3000;
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Initializing the main project folder */
app.use(express.static("website"));
//app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

app.get("/", (req, res) => res.send("index.html"));
app.get("/all", (req, res) => res.send(projectData));
app.post("/data", (req, res) => {
  projectData.data.push(req.body);
});
