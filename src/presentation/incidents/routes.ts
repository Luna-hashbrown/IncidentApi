import { Router, Request, Response } from "express";
import { IncidentController } from "./controller";

export class IncidentRoutes{
    static get routes() :Router{
        const router = Router();
        const incidentController = new IncidentController();
        router.get("/",incidentController.getIncidents);
        router.post("/",incidentController.createIncidents);
        router.get("/:id",incidentController.getItemById);
        router.put("/:id", incidentController.updateIncident);
        router.delete("/:id", incidentController.deleteIncident);
        return router;
    }
}