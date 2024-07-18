import { Router } from "express";
import { getOtherUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middlleware.js"

const router = Router();

router.route("/register").post(upload.single("avatar"),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").patch(verifyJWT,logoutUser)
router.route("/others").get(verifyJWT,getOtherUsers)


export default router;