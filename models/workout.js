//var mongoose= require("mongoose");

//var schema=mongoose.schema;

//var workoutSchema= mongoose.schema({
    //exerciseName: { type: String}
//})

//module.exports = mongoose.model('Workout', workSchema);
var Exercises=require('./exercise').schema;
var mongoose = require('mongoose');

var WorkoutSchema = mongoose.Schema({
    exerciseName: {type: String, required: true},
    exercisesref: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exercise.model' }]
});


module.exports = mongoose.model('Workout', WorkoutSchema);