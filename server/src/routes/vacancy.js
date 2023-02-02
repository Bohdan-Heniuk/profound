import { Router } from "express";
import VacancyController from "../controllers/vacancy.js";
import AuthMiddleware from "../middlewares/auth.js";
import { Roles } from "../common/enums.js";
import RolesGuard from "../middlewares/roles.js";
import { uploadWithoutSaving } from "../services/multer.js";

const vacancyRouter = new Router();

vacancyRouter.post(
  "/",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.create
);

vacancyRouter.post(
  "/filter",
  AuthMiddleware({ requiredLogin: false }),
  VacancyController.getByFitler
);

vacancyRouter.post(
  "/:vacancyId/apply",
  AuthMiddleware({ requiredLogin: true }),
  uploadWithoutSaving.single("CV"),
  RolesGuard([Roles.Candidate]),
  VacancyController.apply
);

vacancyRouter.get(
  "/byUser",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.getByUser
);

vacancyRouter.get(
  "/:id",
  AuthMiddleware({ requiredLogin: false }),
  VacancyController.getById
);

vacancyRouter.put(
  "/:id",
  AuthMiddleware({ requiredLogin: true }),
  RolesGuard([Roles.Recruter]),
  VacancyController.update
);

export default vacancyRouter;
