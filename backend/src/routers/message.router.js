import {Router} from "express";
import verifyJWT from "../middlewares/auth.middlleware.js"
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/send/:receiverId").post(verifyJWT,sendMessage);
router.route("/:receiverId").get(verifyJWT,getMessage);

export default router;