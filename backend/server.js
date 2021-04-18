//Setting up express and db server
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Telling the server where the build folder is
app.use(express.static(path.join(__dirname, '../build')));
//Telling the server where the static folder is
app.use('/static', express.static(path.join(__dirname, 'build//static')));

//Connecting my project to my mongodb database
const connectionString = "mongodb+srv://admin:admin1234@cluster0.dodhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

//Setting up the variables used to store data
var todoSchema = new Schema({
    type: String,
    description: String,
    date: String,
    priority: String
});

var todoModel = mongoose.model("todo", todoSchema);

//Requesting information from 'todos.js' page
app.get('/api/todos', (req, res, next) => {

    todoModel.find((err, data) => {
        res.json(data);
    })
})

//Requesting specific data found at an 'id' on 'todos.js'
app.get('/api/todos/:id', (req, res) => {
    console.log(req.params.id);

    todoModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//Updating the specific data found at the 'id' 
app.put('/api/todos/:id', (req, res) => {
    console.log("Update Todo: " + req.params.id);
    console.log(req.body)

    todoModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        res.send(data);
    })
})

//Deleting the specific data found at the 'id'
app.delete('/api/todos/:id', (req,res) => {
    console.log("Delete Todo: " + req.params.id);

    todoModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

//Saving data from the create page to the DB
app.post('/api/todos', (req, res) => {

    //Lines used for debugging
    // console.log('Todo Recieved');
    // console.log(req.body.type);
    // console.log(req.body.description);
    // console.log(req.body.due_date);
    // console.log(req.body.priority);

    //Filling the variables with the info from the create.js page
    todoModel.create({
        type: req.body.type,
        description: req.body.description,
        date: req.body.due_date,
        priority: req.body.priority
    })

    res.send("Todo Added to DB");
})

//For any url other than the get requests above.. Server uses index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

//Setting the sever to listen at a certain port
app.listen(port, function () {
    //Making sure the server is using the correct port
    console.log("Server is running on Port: " + port);
});