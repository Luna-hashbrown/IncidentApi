import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    }
});

export const IncidentModel = mongoose.model('Incident', incidentSchema);