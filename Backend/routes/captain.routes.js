const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

//  register route for captain
router.post("/register", [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please use a valid email address"),
    body("fullname.firstname").notEmpty().withMessage("First name is required").isLength({min : 3}).withMessage("First name must be at least 3 characters long"),
    body("password").notEmpty().withMessage("Password is required").isLength({min : 6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required").isLength({min : 3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").notEmpty().withMessage("Vehicle plate number is required").isLength({min : 3}).withMessage("Plate number must be at least 3 characters long"),    
    body("vehicle.capacity").notEmpty().withMessage("Vehicle capacity is required").isInt({min : 1}).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").notEmpty().withMessage("Vehicle type is required").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be either car, motorcycle or auto")
],
captainController.registerCaptain);

// login route for captain, validates email and password
router.post("/login",[
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please use a valid email address"),
    body("password").notEmpty().withMessage("Password is required").isLength({min : 6}).withMessage("Password must be at least 6 characters long")
],
captainController.loginCaptain
)

// profile route for captain

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile)

// logout route for captain
router.get("/logout", authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;