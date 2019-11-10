const express = require("express");
const cors= require("cors");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");
var Workout=require("./models/workout");
var Exercise=require("./models/exercise");


const app= express();

//app.get('/', (req, res)=> res.send('hello worldss'));

const router= express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nodejs-demo');


const connection=mongoose.connection;

connection.once('open', ()=> {
    console.log('mongodb database is connected succesfully')
    Init();
});

function Init()
{
    let exercises=
    [
        {
            type: "pullups",
            description: "lifting yo self",
            numberOfReps: 12,
            numberOfSets: 12,
            duration: 12
        },
        {
            type: "pushups",
            description: "lifting yo self again",
            numberOfReps: 10,
            numberOfSets: 10,
            duration: 5
        },
        {
            type: "muscleup",
            description: "lifting yo self third time",
            numberOfReps: 13,
            numberOfSets: 13,
            duration: 13
        },
    ]

    for(let i; i<exercises.length;i++)
    {
        let ex=new Exercise(exercises[i]);
        ex.save();
    }
    console.log("data saved")
}
//return alle workout
router.route('/workouts').get((req, res)=>{
    Workout.find((err, workouts)=>{
        if(err){
            console.log(err)
        }     
        else{
            res.json(workouts);
        }
    });
});
//return alle exercise
router.route('/exercise').get((req, res)=>{
    Exercise.find((err, exercises)=>{
        if(err){
            console.log(err)
        }     
        else{
            res.json(exercises);
        }
    });
});


//se en specifik workout og forbundet exercises til workout
router.route('/exercise/:id').get((req, res)=>{
    Exercise.findById(req.params.id, (err, exercises)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(exercises);
        }
    });
});

//tilføj ny workout
router.route('/workout/add').post((req, res)=>{
    var workout=new Workout(req.body);
    workout.save()
        .then(workout=>{
            res.status(200).json({'workout': 'added succesfully'})
        })
        .catch(err=>{
            res.status(401).send('failed to create new workout why')
        });
});  
//tilføj exercise forbundet til workout metode 1
router.route('/exercise/add').post((req, res)=>{
    var exercise=new Exercise(req.body);
    exercise.save()
        .then(exercise=>{
            res.status(200).json({'exercise': 'added succesfully'})
        })
        .catch(err=>{
            res.status(401).send('failed to create new exercise')
        });
});

//tilføj exercise metode 2 
router.route('/workout/:id/adde').post((req, res)=>{
    exercise.findById(req,params.id, (err, exercise)=>{
        if(!exercise)
        {
            return next(new error('could not add new exercise to workout'));
        }
        else
        {
            exercise.description=req.body.description;
            exercise.numberOfSets=req.body.numberOfSets;
            exercise.numberOfReps=req.body.numberOfReps;
            exercise.duration=req.body.duration;
            exercise.save().then(exercise=>{
                res.json('added exercise');
            }).catch(err=> {
                res.status(400).send('added fail')
            });
        }
    });

});





app.use('/', router);


app.listen(4000, ()=> console.log('express server is running on port 4000'));

