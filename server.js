// Empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
};


//GET route
app.get('/', getData);

function getData(req, res) {
    res.send(projectData);
};

//POST route
app.post('/', callBack);

function callBack(req,res){
    let data = req.body;
    console.log(data)
};