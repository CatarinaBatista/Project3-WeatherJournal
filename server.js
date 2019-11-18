/* Connect dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Empty JS object to act as endpoint for all routes
projectData = {};


// Start up an instance of app
const app = express();

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

app.listen(port, listening);

function listening(){
    console.log(`Running on localhost: ${port}`);
};


// GET route
app.get('/getData', getData);

function getData(req, res) {
    res.send(projectData);
};


// POST route
app.post('/addData', postData);
console.log(projectData)

function postData(req, res){
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    console.log(projectData)
}