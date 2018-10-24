var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
    
var app = express();

mongoose.connect("mongodb://localhost/todo_list_app", {useNewUrlParser: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var Task = require("./models/task")

// RESTFUL ROUTES ====================================================

// ROOT 
app.get("/", function(req, res){
    res.send("THIS IS THE LANDING PAGE");
});

// INDEX ROUTE && SHOW ROUTE
app.get("/tasks", function(req, res){
    Task.find({}, function(err, tasks) {
        if(err) {
            console.log(err);
        } else {
            res.render("tasks", {tasks: tasks})
        }
    });
});

// CREATE ROUTE
app.post("/tasks", function(req, res){
    Task.create(req.body.task, function(err, newTask) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/tasks");
        }
    });
});

// EDIT ROUTE
app.get("/tasks/edit/:id", function(req, res) {
   Task.find(function(err, foundTask){
       if(err) {
           console.log(err);
       } else {
           res.render("edit", {
               tasks: foundTask,
               current: req.params.id
           });
       }
   }); 
});

// UPDATE ROUTE
app.put("/tasks/update/:id", function(req, res) {
    Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, updatedTask) {
        if(err) {
            console.log(err);
            res.redirect("/tasks");
        } else {
            res.redirect("/tasks");
        }
    });
});

// DESTROY ROUTE
app.delete("/tasks/:id", function(req, res) {
    Task.findByIdAndRemove(req.params.id, function(err, deletedTask) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/tasks");
        }
    });
});


//====================================================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("THE TODO LIST APP  SERVER HAS STARTED");
});