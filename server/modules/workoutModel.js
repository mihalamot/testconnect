const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//schema enforcer db data -> cannot insert for example workout without title
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true});  

module.exports = mongoose.model('workout', workoutSchema);   //model is "object" with applied schema