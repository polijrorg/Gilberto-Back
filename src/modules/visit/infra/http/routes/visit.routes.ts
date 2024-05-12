import { Router } from "express";

import VisitController from "../controller/VisitController";

const visitRoutes = Router();

const visitController = new VisitController();

visitRoutes.post("/create", visitController.create);

visitRoutes.delete("/delete/:id", visitController.delete);

visitRoutes.get("/getAll", visitController.getAll);

visitRoutes.get("/getAll/:sellerId", visitController.getAllVisitBySeller);

visitRoutes.get("/update/:id", visitController.update);

export default visitRoutes;
