import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { uploadWithSaving } from "../services/multer.js";

const authRouter = new Router();

authRouter.post(
  "/registration",
  uploadWithSaving.single("avatar"),
  AuthController.registation
);

authRouter.post("/login", AuthController.login);

export default authRouter;
