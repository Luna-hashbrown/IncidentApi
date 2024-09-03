import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.models';
import { EmailService } from '../services/email.service';
import { getParsedCommandLineOfConfigFile } from 'typescript';
import { IncidentDataSource } from '../datasources/incident.datasource';
import { generateIncidentEmailTemplate } from '../templates/email.templates';

export const emailJob = () => {
    const emailService = new EmailService();
    const incidentDataSource = new IncidentDataSource();

    cron.schedule('*/10 * * * * *',async () => {
        console.log("Cada 10 segundos")
        try {
            const incidents = await IncidentModel.find({isEmailSent:false});
            if (!incidents.length){
                console.log("No hay Incidentes pendientes de enviar")
                return;
            }

            console.log(`Procesando ${incidents.length} incidentes.`)

            await Promise.all(
                incidents.map(async (incident) => {
                    const htmlBody = generateIncidentEmailTemplate (
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.lng
                    )
                        await emailService.sendEmail({
                            to: "danyjmoon@gmail.com",
                            subject: `Incidente: ${incident.title}`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el incidente con ID: ${incident._id}`)
                    // let incidentModel = {
                    //     title: incident.title,
                    //     description: incident.description,
                    //     isEmailSent: true,
                    //     lat: incident.lat,
                    //     lng: incident.lng
                    // }
                    await incidentDataSource.updateIncident(incident._id.toString(),{...incident, isEmailSent:true})
                    // await IncidentModel.findByIdAndUpdate(incident._id, incidentModel)
                    console.log(`Incidente actualizado para el ID: ${incident._id}`)
                })
            );
        } catch (error) {
            console.error("Error durante el trabajo de envio de correos");
        }
    })
}