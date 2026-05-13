const Workout = require("../models/Workout");

module.exports.addWorkout = async (req, res) => {

    try {

        const { name, duration, status } = req.body;

        const newWorkout = new Workout({

            name,
            duration,
            status,
            userId: req.user.id

        });

        await newWorkout.save();

        return res.status(201).send({
            message: "Workout added successfully",
            workout: newWorkout
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.getMyWorkouts = async (req, res) => {

    try {

        const workouts = await Workout.find({
            userId: req.user.id
        });

        return res.status(200).send(workouts);

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.updateWorkout = async (req, res) => {

    try {

        const { workoutId, name, duration, status } = req.body;

        const updatedWorkout = await Workout.findOneAndUpdate(

            {
                _id: workoutId,
                userId: req.user.id
            },

            {
                name,
                duration,
                status
            },

            {
                new: true
            }

        );

        if (!updatedWorkout) {

            return res.status(404).send({
                message: "Workout not found"
            });

        }

        return res.status(200).send({
            message: "Workout updated successfully",
            workout: updatedWorkout
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.deleteWorkout = async (req, res) => {

    try {

        const { workoutId } = req.body;

        const deletedWorkout = await Workout.findOneAndDelete({

            _id: workoutId,
            userId: req.user.id

        });

        if (!deletedWorkout) {

            return res.status(404).send({
                message: "Workout not found"
            });

        }

        return res.status(200).send({
            message: "Workout deleted successfully"
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.completeWorkoutStatus = async (req, res) => {

    try {

        const { workoutId } = req.body;

        const completedWorkout = await Workout.findOneAndUpdate(

            {
                _id: workoutId,
                userId: req.user.id
            },

            {
                status: "Completed"
            },

            {
                new: true
            }

        );

        if (!completedWorkout) {

            return res.status(404).send({
                message: "Workout not found"
            });

        }

        return res.status(200).send({
            message: "Workout status updated",
            workout: completedWorkout
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};