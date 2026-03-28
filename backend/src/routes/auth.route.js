import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js"
const authRouter = Router();


/**
 * @route POST /api/auth/register  
 * @description Register new user
 * @access Public
 */

authRouter.post("/register",authController.registerUser)
authRouter.post("/login",authController.userLogin)

/**
 * @route GET /api/auth/logout  
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUser)
/**
 * @route GET /api/auth/get-me  
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/get-me",authUser,authController.getMeController)

export default authRouter;
