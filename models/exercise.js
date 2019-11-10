var mongoose= require("mongoose");

//const schema=mongoose.schema;

var ExerciseSchema = mongoose.Schema({
    workoutId: String,
    type: String,
    description:  String,
    numberOfSets: {type: Number, min: 0, max: 99, required: true},
    numberOfReps: {type: Number , min: 0, max: 99, required: true},
    duration:     {type: Number, min: 0, max: 600, required: true}
});


module.exports = mongoose.model('Exercise', ExerciseSchema);
