import { IncidentModel } from "../../data/models/incident.models";
import { IIncidentDocument } from "../entities/incident.entity";

export class IncidentDataSource {
    public updateIncident = async (id:string, incident:Partial<IIncidentDocument>) => {
        await IncidentModel.findByIdAndUpdate(id,{
            title: incident.title,
            description: incident.description,
            lat: incident.lat,
            lng: incident.lng,
            isEmailSent: incident.isEmailSent
        });
    }
}