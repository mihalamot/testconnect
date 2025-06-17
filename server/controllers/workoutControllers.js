const Workout = require('../modules/workoutModel');  //importing the workout model
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1}); //get all workouts from db

    res.status(200).json(workouts);
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;  //get id from params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: 'Invalid workout ID' });  
    }

    const workout = await Workout.findById(id); 
    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });  
    }

    res.status(200).json(workout);  
}

//post a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;  //destructuring to get data from request body

    try {
        const workout = await Workout.create({ title, load, reps });  //create a workout using Workout model
        res.status(200).json(workout);  //return the created workout with status 200
    } catch (error) {
        return res.status(400).json({ error: error.message });  //return error if something goes wrong
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;  //get id from params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: 'Invalid workout ID' });  
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });  
    }

    res.status(200).json(workout);  
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;  //get id from params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: 'Invalid workout ID' });  
    }

    const workout = await Workout.findOneAndUpdate(
        {_id: id}, {...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });  
    }

    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}