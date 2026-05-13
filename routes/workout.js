const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const workoutController = require("../controllers/workout.js");

router.post("/addWorkout", auth, workoutController.addWorkout);

router.get("/getMyWorkouts", auth, workoutController.getMyWorkouts);

router.patch("/updateWorkout", auth, workoutController.updateWorkout);

router.delete("/deleteWorkout", auth, workoutController.deleteWorkout);

router.patch("/completeWorkoutStatus", auth, workoutController.completeWorkoutStatus);

module.exports = router;