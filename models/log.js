const mongoose= require("mongoose");

const schema=mongoose.schema;

var workoutSchema= new schema({
    exerciseName: { type: String}
})

module.exports = mongoose.model('Workout', workSchema);