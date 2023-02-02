import { Router } from "express";
import CompanyController from "../controllers/company.js";
import AuthMiddleware from "../middlewares/auth.js";
import { Roles } from "../common/enums.js";
import RolesGuard from "../middlewares/roles.js";
import { uploadWithSaving } from "../services/multer.js";

const companyRouter = new Router();

companyRouter.get("/:id", CompanyController.getById);

companyRouter.put(
  "/:id",
  AuthMiddleware({ requiredLogin: true }),
  uploadWithSaving.single("avatar"),
  RolesGuard([Roles.Recruter]),
  CompanyController.update
);

export default companyRouter;
