var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    desc: String,
    completed: false
});

module.exports = mongoose.model("Task", taskSchema);